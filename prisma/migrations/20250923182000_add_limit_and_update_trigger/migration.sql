-- Add monthly limit column to usage and set default to 5
ALTER TABLE public."usage" ADD COLUMN IF NOT EXISTS "limit" INTEGER NOT NULL DEFAULT 5;

-- Update trigger function to set limit to 5 and count to 0 for new users
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

  INSERT INTO public."usage" ("userId","entitlement","periodStart","periodEnd","count","limit","revenuecatUserId")
  VALUES (NEW.id, 'free', v_period_start, v_period_end, 0, 5, NEW.id)
  ON CONFLICT ("userId","entitlement","periodStart") DO NOTHING;

  RETURN NEW;
END;
$$;

