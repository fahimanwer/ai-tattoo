-- Unified migration for Usage accounting and trigger
-- Goal:
--  - Ensure usage has a `limit` column (remaining generations) with default 5
--  - Normalize existing data so that: remaining = max(0, 5 - count)
--  - On new user insert, create a current-month usage row with count=0, limit=5
--  - Idempotent and safe to re-run on shadow DB

-- 1) Ensure `limit` column exists with default 5
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'usage'
      AND column_name = 'limit'
  ) THEN
    ALTER TABLE public."usage" ADD COLUMN "limit" INTEGER NOT NULL DEFAULT 5;
  END IF;
END$$;

-- 2) Normalize existing data for free entitlement
--    Interpret `count` as used (0..5) and compute remaining as 5 - count
UPDATE public."usage"
SET "limit" = GREATEST(0, 5 - COALESCE("count", 0))
WHERE "entitlement" = 'free';

-- 3) Function: initialize usage on user insert for current month
CREATE OR REPLACE FUNCTION public.fn_init_usage_on_user_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  v_period_start timestamp;
  v_period_end   timestamp;
BEGIN
  v_period_start := date_trunc('month', now());
  v_period_end   := (date_trunc('month', now()) + interval '1 month' - interval '1 millisecond');

  INSERT INTO public."usage" (
    "userId","entitlement","periodStart","periodEnd","count","limit","revenuecatUserId"
  )
  VALUES (NEW.id, 'free', v_period_start, v_period_end, 0, 5, NEW.id)
  ON CONFLICT ("userId","entitlement","periodStart") DO NOTHING;

  RETURN NEW;
END;
$$;

-- 4) Recreate trigger safely
DROP TRIGGER IF EXISTS trg_init_usage_on_user_insert ON public."user";
CREATE TRIGGER trg_init_usage_on_user_insert
AFTER INSERT ON public."user"
FOR EACH ROW
EXECUTE FUNCTION public.fn_init_usage_on_user_insert();


