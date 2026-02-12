-- Fix usage count logic: count should represent used generations (0-5), not remaining
-- Update existing records to have count = 0 (no generations used yet)
UPDATE public."usage" 
SET "count" = 0 
WHERE "entitlement" = 'free' AND "count" > 0;

-- Update the trigger function to use correct logic
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

  INSERT INTO public."usage" ("userId","entitlement","periodStart","periodEnd","count","revenuecatUserId")
  VALUES (NEW.id, 'free', v_period_start, v_period_end, 0, NEW.id)
  ON CONFLICT ("userId","entitlement","periodStart") DO NOTHING;

  RETURN NEW;
END;
$$;
