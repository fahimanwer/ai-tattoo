-- Clean up duplicate usage records
-- Keep only the record with the correct periodStart (first day of month at midnight UTC)
-- and aggregate the count and limit values

WITH duplicates AS (
  SELECT 
    "userId",
    "entitlement",
    -- Find the correct periodStart (first day of month at midnight)
    date_trunc('month', "periodStart") as correct_period_start,
    -- Aggregate count and limit
    SUM("count") as total_count,
    SUM("limit") as total_limit,
    -- Keep the earliest periodEnd
    MIN("periodEnd") as earliest_period_end,
    -- Keep the first revenuecatUserId
    (array_agg("revenuecatUserId"))[1] as first_revenuecat_user_id
  FROM public."usage"
  WHERE "entitlement" = 'free'
  GROUP BY "userId", "entitlement", date_trunc('month', "periodStart")
  HAVING COUNT(*) > 1
),
-- Delete all duplicate records
deleted AS (
  DELETE FROM public."usage"
  WHERE ("userId", "entitlement", "periodStart") IN (
    SELECT u."userId", u."entitlement", u."periodStart"
    FROM public."usage" u
    INNER JOIN duplicates d ON (
      u."userId" = d."userId" 
      AND u."entitlement" = d."entitlement"
      AND date_trunc('month', u."periodStart") = d.correct_period_start
    )
  )
  RETURNING "userId", "entitlement"
),
-- Insert the consolidated record
inserted AS (
  INSERT INTO public."usage" (
    "userId", "entitlement", "periodStart", "periodEnd", "count", "limit", "revenuecatUserId"
  )
  SELECT 
    "userId",
    "entitlement", 
    correct_period_start,
    earliest_period_end,
    total_count,
    total_limit,
    first_revenuecat_user_id
  FROM duplicates
  ON CONFLICT ("userId", "entitlement", "periodStart") DO UPDATE SET
    "count" = EXCLUDED."count",
    "limit" = EXCLUDED."limit",
    "periodEnd" = EXCLUDED."periodEnd",
    "revenuecatUserId" = EXCLUDED."revenuecatUserId"
  RETURNING "userId", "entitlement"
)
SELECT 'Cleaned up duplicate usage records' as result;
