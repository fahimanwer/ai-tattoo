# Tattoo Design AI - Generator & Try On

Preview virtual tattoos on your body with AI. Upload a photo of your arm, leg, or face and see how any tattoo design looks on your skin. Generate custom designs, browse inspiration, or try on tattoos instantly.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (package manager — **never** use npm/yarn/pnpm)
- [Node.js](https://nodejs.org/) v18+
- [Convex](https://www.convex.dev/) account (backend)
- [EAS CLI](https://docs.expo.dev/build/setup/) for builds

### Installation

```bash
git clone <repository-url>
cd ai-tattoo
bun install
```

### Environment Variables

Create `.env.local`:

```env
# Convex
CONVEX_DEPLOYMENT="your-convex-deployment"
EXPO_PUBLIC_CONVEX_URL="your-convex-url"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"

# Google OAuth
EXPO_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# Cloudflare R2 (for static assets)
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
```

### Running

```bash
# Start Convex dev server
bunx convex dev

# Start Expo dev server (separate terminal)
bun start

# Build for iOS (requires dev build — Expo Go not supported)
bun run ios
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Expo SDK 55, React Native 0.83, React 19 |
| **Navigation** | Expo Router with native tabs |
| **Backend** | [Convex](https://www.convex.dev/) (realtime DB + serverless functions) |
| **Auth** | [Better Auth](https://www.better-auth.com/) with Google OAuth |
| **Payments** | [RevenueCat](https://www.revenuecat.com/) |
| **AI** | Google Gemini (image generation) |
| **UI** | [HeroUI Native](https://heroui.com/) + [Uniwind](https://uniwind.dev/) (Tailwind v4 for RN) |
| **iOS Native UI** | @expo/ui/swift-ui |
| **Static Assets** | Cloudflare R2 CDN |
| **Analytics** | Vexo |

## Project Structure

```
src/
├── app/                    # Expo Router routes
│   ├── (onboarding)/      # Onboarding + auth screens
│   ├── (tabs)/            # Bottom tab navigation (home, explore, profile)
│   └── (playground)/      # AI generation playground
├── components/
│   ├── screens/           # Screen-level components
│   │   └── profile/       # Shared hooks + platform UI shells
│   ├── ui/                # Reusable UI components
│   ├── home/              # Home screen sections
│   ├── explore/           # Explore filters
│   ├── onboarding/        # Onboarding flow
│   └── tattoos/           # Tattoo detail/history
├── context/               # React contexts (Theme, Subscription, Playground)
├── hooks/                 # Custom hooks
├── constants/             # App constants (CDN, navigation, flows)
└── translations/          # i18n locales (34 languages)

convex/                    # Convex backend
├── schema.ts             # Database schema
├── generation.ts         # AI generation actions
├── usage.ts              # Usage tracking queries/mutations
├── webhooks.ts           # RevenueCat webhook handlers
├── subscription.ts       # Subscription sync
├── planLimits.ts         # Plan configuration
└── http.ts               # HTTP routes (webhooks)

lib/                       # Shared utilities
scripts/                   # Build/migration scripts
```

## Architecture Pattern

**"Shared Hook + Thin UI Shell"**

- All business logic lives in shared hooks (`useXData()`)
- iOS `.ios.tsx` files use SwiftUI via `@expo/ui/swift-ui`
- Base `.tsx` files use HeroUI Native (Android)
- Metro auto-resolves `.ios.tsx` on iOS

## Subscription Model

Single entitlement: **`pro`**

| Plan | Price | Generation Limit | Trial |
|------|-------|-----------------|-------|
| Pro Weekly | $9.99/week | 35/week | None |
| Pro Annual | $59.99/year | 150/30-day period | 7-day free |
| Offer Weekly | $6.99/week | 35/week | None |
| Offer Annual | $39.99/year | 150/30-day period | 7-day free |

Free tier: 1 one-time generation.

Two offerings: `pro_default` (main paywall) and `pro_offer` (discount paywall shown after dismissing main).

## Documentation

- [Onboarding Flow & Conversion Strategy](docs/ONBOARDING.md)
- [Launch Checklist](LAUNCH_CHECKLIST.md)
