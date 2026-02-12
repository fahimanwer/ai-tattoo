-- One-time Free Usage Migration
-- This migration updates the system to provide 5 one-time free generations (not monthly renewable)

-- 1. Update existing free tier records to have a far-future periodEnd date
UPDATE public."usage"
SET "periodEnd" = '2099-12-31 23:59:59.999'::timestamp
WHERE "entitlement" = 'free';

-- 2. Update the trigger function to create one-time free usage records for new users
CREATE OR REPLACE FUNCTION public.fn_init_usage_on_user_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  v_period_start timestamp;
  v_period_end   timestamp;
BEGIN
  -- Set period start to user creation time (now)
  v_period_start := now();
  -- Set period end to far future to indicate "never expires"
  v_period_end   := '2099-12-31 23:59:59.999'::timestamp;

  INSERT INTO public."usage" (
    "userId","entitlement","periodStart","periodEnd","count","limit","revenuecatUserId"
  )
  VALUES (NEW.id, 'free', v_period_start, v_period_end, 0, 5, NEW.id)
  ON CONFLICT ("userId","entitlement","periodStart") DO NOTHING;

  RETURN NEW;
END;
$$;

-- 3. Ensure trigger exists (recreate it if needed)
DROP TRIGGER IF EXISTS trg_init_usage_on_user_insert ON public."user";
CREATE TRIGGER trg_init_usage_on_user_insert
AFTER INSERT ON public."user"
FOR EACH ROW
EXECUTE FUNCTION public.fn_init_usage_on_user_insert();

