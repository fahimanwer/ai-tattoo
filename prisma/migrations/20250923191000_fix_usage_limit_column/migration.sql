-- Add limit column to usage table if it doesn't exist
ALTER TABLE public."usage" ADD COLUMN IF NOT EXISTS "limit" INTEGER NOT NULL DEFAULT 5;

-- Update existing records to have proper limit values
UPDATE public."usage" 
SET "limit" = GREATEST(0, 5 - COALESCE("count", 0))
WHERE "entitlement" = 'free';

-- Update trigger function to include limit column
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

-- Recreate trigger
DROP TRIGGER IF EXISTS trg_init_usage_on_user_insert ON public."user";
CREATE TRIGGER trg_init_usage_on_user_insert
AFTER INSERT ON public."user"
FOR EACH ROW
EXECUTE FUNCTION public.fn_init_usage_on_user_insert();
