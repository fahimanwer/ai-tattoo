# Usage System Refactor - Complete Documentation

## Overview

This document describes the complete refactor of the usage tracking system. The refactor consolidates multiple hooks, centralizes plan configuration, and provides a scalable, maintainable solution for usage tracking and validation.

## Changes Made

### 1. Created Centralized Plan Configuration (`constants/plan-limits.ts`)

**Purpose**: Single source of truth for all subscription tier configurations, limits, and features.

**Key Features**:

- ✅ Defines all plan tiers: `free`, `starter`, `plus`, `pro`
- ✅ Monthly limits: Free (5), Starter (125), Plus (300), Pro (1000)
- ✅ Plan metadata: display names, colors, features
- ✅ Utility functions: `getPlanConfig()`, `getMonthlyLimit()`, `entitlementToTier()`
- ✅ Shared between client and server for consistent validation

**Usage Example**:

```typescript
import { getPlanConfig, getMonthlyLimit } from "@/constants/plan-limits";

const config = getPlanConfig("pro");
console.log(config.monthlyLimit); // 1000
console.log(config.displayName); // "Pro"
console.log(config.color); // "#3b82f6"
```

---

### 2. Enhanced Usage API (`app/api/user/usage+api.ts`)

**Purpose**: Returns comprehensive, actionable usage data with tier-aware limits.

**What Changed**:

- ✅ Now returns `currentPeriod` object with all current period data
- ✅ Includes `subscriptionTier` determined from usage records
- ✅ Provides `planInfo` with display metadata
- ✅ Calculates correct limits based on user's tier
- ✅ Handles cases where no usage record exists yet

**Response Structure**:

```typescript
{
  usage: UsageRecord[],           // Historical records
  totalUsage: number,              // Total across all time
  currentPeriod: {
    used: number,                  // Current period usage
    limit: number,                 // Tier-based limit
    remaining: number,             // Calculations done
    periodStart: string,           // ISO date
    periodEnd: string,             // ISO date
    isLimitReached: boolean        // Ready to use
  },
  subscriptionTier: "pro",         // User's current tier
  planInfo: {
    displayName: "Pro",
    color: "#3b82f6",
    features: [...]
  }
}
```

**Benefits**:

- ✅ Client doesn't need to calculate limits
- ✅ Server has single source of truth
- ✅ Easier to validate and test
- ✅ Consistent across all clients

---

### 3. Consolidated `useUsageLimit` Hook (`hooks/useUsageLimit.ts`)

**Purpose**: Single, powerful hook that provides ALL usage-related data and utilities.

**Replaces**: `useUsage` and the old `useUsageLimit` hooks (now consolidated into one).

**What It Provides**:

#### Current Period Data

```typescript
const {
  used, // Current usage count
  limit, // Current tier's limit
  remaining, // Calculated remaining
  isLimitReached, // Boolean flag
  canCreateTattoo, // Inverse of isLimitReached
  periodStart, // Period start date
  periodEnd, // Period end date
} = useUsageLimit();
```

#### Subscription Data

```typescript
const {
  subscriptionTier, // "free" | "starter" | "plus" | "pro"
  planDisplayName, // "Free", "Starter", "Plus", "Pro"
  planColor, // "#3b82f6" etc
  planFeatures, // Array of feature strings
} = useUsageLimit();
```

#### Historical & UI Helpers

```typescript
const {
  totalUsage, // Total usage all time
  allUsageRecords, // Raw usage records
  limitMessage, // User-friendly message
  usagePercentage, // 0-100 percentage
} = useUsageLimit();
```

#### Query State

```typescript
const {
  isLoading, // Loading state
  error, // Error object
  refetch, // Manual refetch function
  data, // Raw response data
} = useUsageLimit();
```

**Benefits**:

- ✅ One import instead of multiple
- ✅ All usage data in one place
- ✅ Consistent API across the app
- ✅ Easy to extend with new features

---

### 4. Updated Components

#### `Profile.ios.tsx`

- ✅ Now uses consolidated hook
- ✅ Displays accurate plan info with colors
- ✅ Shows remaining generations
- ✅ Usage percentage display
- ✅ Responsive to limit status

#### `Profile.tsx`

- ✅ Updated to use new hook
- ✅ Simplified refresh logic

#### `CustomDetails.tsx`

- ✅ Already using `useUsageLimit` (no changes needed)
- ✅ Validates limits before creation

#### `UsageDisplay.tsx`

- ✅ Enhanced with more data points
- ✅ Shows plan name
- ✅ Displays percentage
- ✅ Color-coded by tier and status

#### `OfferingCard.tsx`

- ✅ Now uses centralized plan config
- ✅ Automatically shows correct limits
- ✅ Displays plan features
- ✅ No hardcoded values

#### `useUserData.ts`

- ✅ Updated to use consolidated hook
- ✅ Maintains backward compatibility

---

### 5. Type Safety & API Client

**Updated `lib/nano.ts`**:

- ✅ New types: `CurrentPeriodUsage`, enhanced `UsageResponse`
- ✅ Matches server response exactly
- ✅ Import `PlanTier` from centralized config

**Type Safety**:

```typescript
import type { PlanTier } from "@/constants/plan-limits";
import type { UsageResponse } from "@/lib/nano";

// All types are now shared and consistent
```

---

### 6. Removed Files

**Deleted**: `hooks/useUsage.ts`

- ✅ Functionality consolidated into `useUsageLimit`
- ✅ Legacy export provided for backward compatibility

---

## Migration Guide

### Before:

```typescript
// Old way - using multiple hooks
import { useUsage } from "@/hooks/useUsage";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { useSubscription } from "@/hooks/useSubscription";

const { data: usageData } = useUsage();
const { used, limit, isLimitReached } = useUsageLimit();
const { subscriptionTier } = useSubscription();

// Manual calculations
const percentage = (used / limit) * 100;
const remaining = limit - used;
```

### After:

```typescript
// New way - one hook with everything
import { useUsageLimit } from "@/hooks/useUsageLimit";

const {
  used,
  limit,
  remaining,
  isLimitReached,
  subscriptionTier,
  planDisplayName,
  planColor,
  usagePercentage,
  limitMessage,
  canCreateTattoo,
  refetch,
} = useUsageLimit();

// Everything is calculated and ready to use!
```

---

## Benefits

### For Developers

1. **Single Import**: One hook for all usage needs
2. **Type Safety**: Shared types between client and server
3. **No Manual Calculations**: Server does the math
4. **Easy Testing**: Clear, predictable data structure
5. **Scalable**: Easy to add new tiers or features

### For Users

1. **Accurate Limits**: Always shows correct tier limits
2. **Real-Time Data**: Immediate updates after purchases
3. **Clear Messaging**: User-friendly limit messages
4. **Visual Feedback**: Color-coded status indicators

### For Business

1. **Centralized Config**: Update limits in one place
2. **Consistent Validation**: Same rules everywhere
3. **Easy A/B Testing**: Modify plan configs easily
4. **Audit Trail**: Clear usage tracking

---

## Plan Configuration

### Current Plans

| Tier    | Monthly Limit | Price  | Color  | Features                                      |
| ------- | ------------- | ------ | ------ | --------------------------------------------- |
| Free    | 5             | $0     | Gray   | Basic features                                |
| Starter | 125           | $4.99  | Orange | All styles, High quality                      |
| Plus    | 300           | $9.99  | Green  | Premium quality, Priority support             |
| Pro     | 1000          | $24.99 | Blue   | Ultra quality, Early access, Priority support |

### Adding a New Plan

```typescript
// constants/plan-limits.ts
export const PLAN_LIMITS = {
  // ... existing plans
  premium: {
    tier: "premium",
    displayName: "Premium",
    monthlyLimit: 500,
    color: "#8b5cf6", // purple
    features: [
      "500 generations per month",
      "Premium features",
      // ...
    ],
  },
};
```

That's it! The new plan will automatically work everywhere.

---

## Testing

### Server-Side Validation

```bash
# Test usage API
curl -X POST http://localhost:3000/api/user/usage \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Client-Side Testing

```typescript
// In your component
const { used, limit, isLimitReached, subscriptionTier } = useUsageLimit();

console.log({
  used,
  limit,
  isLimitReached,
  tier: subscriptionTier,
});
```

---

## Error Handling

The system gracefully handles:

- ✅ No usage records (creates default period)
- ✅ Missing subscription (defaults to free tier)
- ✅ API errors (shows error state)
- ✅ Loading states (shows loading)
- ✅ Invalid tiers (falls back to free)

---

## Future Enhancements

Potential improvements:

1. **Usage Analytics**: Track usage patterns
2. **Notifications**: Alert users near limit
3. **Usage History**: Show monthly trends
4. **Rollover Credits**: Unused generations carry over
5. **Team Plans**: Multi-user limits
6. **Custom Limits**: Per-user limit overrides

---

## Summary

This refactor provides:

- ✅ **Centralized Configuration**: One source of truth
- ✅ **Enhanced API**: Rich, actionable data
- ✅ **Consolidated Hook**: One import, everything you need
- ✅ **Type Safety**: Shared types everywhere
- ✅ **Better UX**: Accurate, real-time data
- ✅ **Scalability**: Easy to extend

The system is now production-ready and easy to maintain! 🚀
