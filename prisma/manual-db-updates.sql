-- =============================================================================
-- Manual Database Updates
-- =============================================================================
-- 
-- This file contains SQL statements that can be run manually against the database
-- when needed. These are typically one-time fixes or updates that aren't handled
-- by Prisma migrations.
--
-- HOW TO RUN:
-- npx prisma db execute --file prisma/manual-db-updates.sql --schema prisma/schema.prisma
--
-- WARNING: Review the SQL carefully before running, especially on production!
-- =============================================================================


-- -----------------------------------------------------------------------------
-- Update Free Tier Limit
-- -----------------------------------------------------------------------------
-- Updates all existing free tier users to have the new limit value.
-- The FREE_TIER_LIMIT constant is defined in src/constants/plan-limits.ts
-- 
-- Change the value below to match FREE_TIER_LIMIT when updating:

UPDATE public."usage"
SET "limit" = 2
WHERE "entitlement" = 'free';


-- -----------------------------------------------------------------------------
-- Update Free Tier Trigger Function
-- -----------------------------------------------------------------------------
-- This updates the trigger that runs when new users sign up.
-- Make sure the limit value matches FREE_TIER_LIMIT in src/constants/plan-limits.ts

-- CREATE OR REPLACE FUNCTION public.fn_init_usage_on_user_insert()
-- RETURNS trigger
-- LANGUAGE plpgsql
-- AS $$
-- DECLARE
--   v_period_start timestamp;
--   v_period_end   timestamp;
-- BEGIN
--   v_period_start := now();
--   v_period_end   := '2099-12-31 23:59:59.999'::timestamp;
--
--   INSERT INTO public."usage" (
--     "userId","entitlement","periodStart","periodEnd","count","limit","revenuecatUserId"
--   )
--   VALUES (NEW.id, 'free', v_period_start, v_period_end, 0, 2, NEW.id)
--   ON CONFLICT ("userId","entitlement","periodStart") DO NOTHING;
--
--   RETURN NEW;
-- END;
-- $$;
