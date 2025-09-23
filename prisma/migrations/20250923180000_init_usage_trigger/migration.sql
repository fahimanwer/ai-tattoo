-- Ensure initial Usage row is created for new users in the current month

-- Function: creates a 'free' Usage row for the current billing month after inserting into public.user
CREATE OR REPLACE FUNCTION public.fn_init_usage_on_user_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  v_period_start timestamp;
  v_period_end   timestamp;
BEGIN
  -- First day of current month at 00:00:00.000
  v_period_start := date_trunc('month', now());
  -- Last millisecond of current month (TIMESTAMP(3) friendly)
  v_period_end   := (date_trunc('month', now()) + interval '1 month' - interval '1 millisecond');

  INSERT INTO public."usage" ("userId","entitlement","periodStart","periodEnd","count","revenuecatUserId")
  VALUES (NEW.id, 'free', v_period_start, v_period_end, 0, NEW.id)
  ON CONFLICT ("userId","entitlement","periodStart") DO NOTHING;

  RETURN NEW;
END;
$$;

-- Trigger: executes after inserting a new row into public.user
DROP TRIGGER IF EXISTS trg_init_usage_on_user_insert ON public."user";
CREATE TRIGGER trg_init_usage_on_user_insert
AFTER INSERT ON public."user"
FOR EACH ROW
EXECUTE FUNCTION public.fn_init_usage_on_user_insert();


