# Onboarding Flow & Conversion Strategy

## Overview

The onboarding flow is a **single-shot conversion funnel**. Every question builds toward the paywall moment by collecting personalization data that makes messaging relevant and emotionally resonant.

---

## Flow Diagram

```
Step 1:  BEFORE/AFTER DEMO       → Visual proof of concept
Step 2:  NAME COLLECTION         → Personal connection
Step 3:  FEATURE INTRO           → Set expectation for personalization
Step 4:  USER TYPE (critical)    → Segment: Artist | Client | Model | Explorer
Step 5:  GOALS (critical)        → Use case: Try-on | Generate | Browse | Cover-up
Step 6:  FEATURE SHOWCASE        → Reinforce core value
Step 7:  LOCATION                → Body part preferences (25+ options)
Step 8:  STYLES                  → Aesthetic preferences (25+ styles, max 4)
Step 9:  TIMEFRAME               → Urgency: This week | Month | 1-3 months | Someday
Step 10: VIBE                    → Emotional/aesthetic vibes (25+ options)
Step 11: LOADING/REVIEWS         → Build anticipation + social proof
Step 12: CONGRATULATIONS (critical) → Celebrate + reinforce value
         ↓
         PAYWALL                 → Personalized headline + features
```

---

## Personalization Map

| Data Point | Where It's Used |
|------------|----------------|
| **Name** | Welcome title, Congratulations title, Loading messages |
| **User Type** | Paywall headline, Congratulations greeting/urgency, Feature cards |
| **Goals** | Paywall headline, Congratulations greeting/urgency, Feature cards, Loading messages |
| **Location** | Feature card descriptions |
| **Styles** | Loading messages, Feature card descriptions |
| **Timeframe** | Urgency feature cards |
| **Vibe** | Currently underutilized (optimization opportunity) |

---

## Paywall Headline Personalization

Priority order (first match wins):

| Priority | Condition | Headline |
|----------|-----------|----------|
| 1 | Artist type | "Show clients their tattoo before you ink" |
| 2 | Cover-up goal | "Transform your tattoo with confidence" |
| 3 | Try-on goal | "See your tattoo before you commit" |
| 4 | Generate goal | "Design the tattoo you've always wanted" |
| 5 | Browse goal | "Find your perfect tattoo design" |
| 6 | Default | "Design the tattoo you've always wanted" |

---

## Conversion Funnel Stages

1. **Awareness** — Before/After demo (visual proof)
2. **Interest** — Name + Feature intro
3. **Engagement** — User Type + Goals + Feature Showcase
4. **Commitment** — Location + Styles + Timeframe + Vibe
5. **Anticipation** — Loading/Reviews
6. **Value Reinforcement** — Congratulations (personalized features)
7. **Conversion** — Paywall

---

## Data Collected

```
user-name       → string
user-description → array (artist/client/model/explorer)
goal            → array (try_on/generate/browse/cover_up)
location        → array (25+ body parts)
styles          → array (25+ styles, max 4)
timeframe       → string (this_week/this_month/this_year/someday)
vibe            → array (25+ emotional/aesthetic vibes)
```

---

## Optimization Opportunities

1. **Vibe data** — Collected but unused. Could personalize featured tattoos, search suggestions, generation prompts
2. **Location data** — Only used in 1 feature card. Could set default body part in try-on
3. **Style data** — Partially used. Could set default style filters
4. **Post-onboarding** — Answers not used in main app experience yet

---

## Key Conversion Principles

- **Progressive Disclosure**: Each question builds investment
- **Emotional Connection**: Name and vibe create attachment
- **Value Demonstration**: Feature steps reinforce capabilities
- **Urgency**: Timeframe drives immediate action
- **Social Proof**: Reviews build trust during loading
- **Personalization Depth**: Multiple touchpoints use answers
