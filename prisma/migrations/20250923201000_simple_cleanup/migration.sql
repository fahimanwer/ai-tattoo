-- Simple cleanup of duplicate usage records
-- Delete all records and recreate with correct periodStart

-- First, let's see what we have
-- SELECT "userId", "entitlement", "periodStart", "count", "limit" FROM public."usage" WHERE "entitlement" = 'free';

-- Delete all free usage records
DELETE FROM public."usage" WHERE "entitlement" = 'free';

-- The trigger will recreate them when needed, or we can manually insert them
-- This ensures we start fresh with the correct periodStart calculation
