# Onboarding Flow Visual Diagram

## Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    ONBOARDING FLOW                          │
└─────────────────────────────────────────────────────────────┘

Step 1: BEFORE/AFTER DEMO
├─ Purpose: Visual proof of concept
├─ Personalization: None (universal)
└─ Impact: High (establishes credibility)

Step 2: NAME COLLECTION
├─ Purpose: Personal connection
├─ Personalization: Used in welcome, congratulations, loading
└─ Impact: Medium-High (emotional connection)

Step 3: FEATURE INTRO
├─ Purpose: Set expectation for personalization
├─ Personalization: Name in title (if provided)
└─ Impact: Medium (sets stage)

Step 4: USER TYPE ⭐ CRITICAL
├─ Purpose: Segment by relationship to tattoos
├─ Options: Artist | Client | Model | Explorer
├─ Personalization: 
│   ├─ Paywall headline
│   ├─ Congratulations greeting
│   ├─ Urgency message
│   └─ Feature cards
└─ Impact: CRITICAL (determines messaging strategy)

Step 5: GOALS ⭐ CRITICAL
├─ Purpose: Understand primary use case
├─ Options: Try-on | Generate | Browse | Cover-up
├─ Personalization:
│   ├─ Paywall headline (primary driver)
│   ├─ Congratulations greeting
│   ├─ Urgency message
│   ├─ Feature cards
│   └─ Loading messages
└─ Impact: CRITICAL (primary personalization driver)

Step 6: FEATURE SHOWCASE
├─ Purpose: Reinforce core value
├─ Personalization: None
└─ Impact: Medium (value reinforcement)

Step 7: LOCATION
├─ Purpose: Understand placement preferences
├─ Options: 25+ body parts
├─ Personalization: Feature card descriptions
└─ Impact: Medium (shows attention to detail)

Step 8: STYLES
├─ Purpose: Understand aesthetic preferences
├─ Options: 25+ styles (max 4 selections)
├─ Personalization: Loading messages, feature cards
└─ Impact: Medium (demonstrates curation)

Step 9: TIMEFRAME
├─ Purpose: Create urgency
├─ Options: This week | This month | 1-3 months | Someday
├─ Personalization: Urgency feature cards
└─ Impact: High (urgency drives conversion)

Step 10: VIBE
├─ Purpose: Emotional connection
├─ Options: 25+ emotional/aesthetic vibes
├─ Personalization: ⚠️ UNDERUTILIZED
└─ Impact: Medium (emotional connection, but unused)

Step 11: LOADING/REVIEWS
├─ Purpose: Build anticipation + social proof
├─ Personalization: 
│   ├─ Loading messages (name, styles, goals)
│   └─ Reviews display
└─ Impact: High (builds anticipation)

Step 12: CONGRATULATIONS ⭐ CRITICAL
├─ Purpose: Celebrate + reinforce value
├─ Personalization:
│   ├─ Greeting (user type, goals)
│   ├─ Feature cards (goals, type, location, styles, timeframe)
│   └─ Urgency message (user type, goals)
└─ Impact: CRITICAL (last impression before paywall)

┌─────────────────────────────────────────────────────────────┐
│                      PAYWALL                                │
└─────────────────────────────────────────────────────────────┘

Personalized Headline Priority:
1. Artist type → "Show clients their tattoo before you ink"
2. Cover-up goal → "Transform your tattoo with confidence"
3. Try-on goal → "See your tattoo before you commit"
4. Generate goal → "Design the tattoo you've always wanted"
5. Browse goal → "Find your perfect tattoo design"
6. Default → "Design the tattoo you've always wanted"

Flow Options:
├─ Purchase → Complete onboarding
├─ Skip → Complete onboarding (free user)
└─ Restore → Link existing subscription

```

## Personalization Map

```
┌─────────────────────────────────────────────────────────────┐
│              PERSONALIZATION TOUCHPOINTS                      │
└─────────────────────────────────────────────────────────────┘

NAME
├─ Welcome step title
├─ Congratulations step title
└─ Loading messages

USER TYPE (Artist/Client/Model/Explorer)
├─ Paywall headline ⭐
├─ Congratulations greeting ⭐
├─ Congratulations urgency message ⭐
└─ Feature cards ⭐

GOALS (Try-on/Generate/Browse/Cover-up)
├─ Paywall headline ⭐⭐
├─ Congratulations greeting ⭐
├─ Congratulations urgency message ⭐
├─ Feature cards ⭐⭐
└─ Loading messages

LOCATION (25+ body parts)
└─ Feature card descriptions

STYLES (25+ styles, max 4)
├─ Loading messages
└─ Feature card descriptions

TIMEFRAME (This week/Month/1-3 months/Someday)
└─ Urgency feature cards

VIBE (25+ emotional/aesthetic vibes)
└─ ⚠️ CURRENTLY UNUSED (optimization opportunity)

```

## Conversion Funnel

```
┌─────────────────────────────────────────────────────────────┐
│              CONVERSION OPTIMIZATION FLOW                    │
└─────────────────────────────────────────────────────────────┘

AWARENESS
└─ Before/After Demo (visual proof)

INTEREST
├─ Name Collection (personal connection)
└─ Feature Intro (sets expectation)

ENGAGEMENT
├─ User Type (segmentation)
├─ Goals (use case identification)
└─ Feature Showcase (value reinforcement)

COMMITMENT
├─ Location (detail personalization)
├─ Styles (aesthetic matching)
├─ Timeframe (urgency creation)
└─ Vibe (emotional connection)

ANTICIPATION
└─ Loading/Reviews (builds excitement)

VALUE REINFORCEMENT
└─ Congratulations (personalized features)

CONVERSION POINT ⭐
└─ Paywall (personalized headline + features)

```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA COLLECTION                          │
└─────────────────────────────────────────────────────────────┘

Answers Collected:
├─ user-name (string)
├─ user-description (array: artist/client/model/explorer)
├─ goal (array: try_on/generate/browse/cover_up)
├─ location (array: 25+ body parts)
├─ styles (array: 25+ styles, max 4)
├─ timeframe (string: this_week/this_month/this_year/someday)
└─ vibe (array: 25+ emotional/aesthetic vibes)

┌─────────────────────────────────────────────────────────────┐
│                  PERSONALIZATION USAGE                      │
└─────────────────────────────────────────────────────────────┘

Immediate Use (Onboarding):
├─ Name → Welcome, Congratulations titles
├─ User Type → Paywall headline, Congratulations
├─ Goals → Paywall headline, Feature cards
├─ Location → Feature descriptions
├─ Styles → Loading messages, Feature descriptions
├─ Timeframe → Urgency features
└─ Vibe → ⚠️ NOT USED

Post-Onboarding (Potential):
├─ Name → Home screen welcome, notifications
├─ User Type → Content filtering, default features
├─ Goals → Default tools, featured content
├─ Location → Default body part, design suggestions
├─ Styles → Default filters, featured tattoos
├─ Timeframe → Reminder notifications, urgency messaging
└─ Vibe → Design suggestions, content filtering

```

## Key Insights

### ⭐ Critical Conversion Points
1. **User Type Question** - Determines entire messaging strategy
2. **Goals Question** - Primary driver of personalization
3. **Congratulations Step** - Last impression before paywall
4. **Paywall Headline** - First thing users see, heavily personalized

### ⚠️ Optimization Opportunities
1. **Vibe Data** - Collected but unused (high potential)
2. **Location Data** - Underutilized (could personalize defaults)
3. **Style Data** - Partially used (could enhance filtering)
4. **Post-Onboarding** - Answers not used in main app experience

### 📊 Conversion Strategy
- **Progressive Disclosure**: Each question builds investment
- **Emotional Connection**: Name and vibe create attachment
- **Value Demonstration**: Feature steps reinforce capabilities
- **Urgency Creation**: Timeframe drives immediate action
- **Personalization Depth**: Multiple touchpoints use answers
- **Social Proof**: Reviews build trust during loading

