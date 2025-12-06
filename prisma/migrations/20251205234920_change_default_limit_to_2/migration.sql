-- AlterTable
ALTER TABLE "usage" ALTER COLUMN "limit" SET DEFAULT 2;

-- Update the trigger function to use the new limit of 2 for new users
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
  VALUES (NEW.id, 'free', v_period_start, v_period_end, 0, 2, NEW.id)
  ON CONFLICT ("userId","entitlement","periodStart") DO NOTHING;

  RETURN NEW;
END;
$$;
