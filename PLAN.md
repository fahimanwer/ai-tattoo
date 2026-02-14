# Tattoo Design AI → Self-Hosted Convex Migration Plan

## Overview

Migrate Tattoo Design AI (AI tattoo generator) from Prisma + Expo API Routes to self-hosted Convex with BetterAuth, deployed on Hetzner via Coolify.

---

## Current Architecture → Target Architecture

```
CURRENT:
Expo App → Expo API Routes (EAS) → Prisma → PostgreSQL (Accelerate)
                                  → Better Auth (Prisma adapter)
                                  → Gemini/OpenAI APIs
                                  → RevenueCat webhooks

TARGET:
Expo App → Self-Hosted Convex (Hetzner/Coolify) → PostgreSQL
                                                 → Better Auth (Convex adapter)
                                                 → Gemini/OpenAI APIs (via actions)
                                                 → RevenueCat webhooks (via HTTP actions)
                                                 → Convex file storage (image backup)
                                                 → Real-time subscriptions (free!)
```

---

## Decisions Made

| Decision | Choice |
|---|---|
| Hosting | Hetzner VPS with Coolify |
| Database | PostgreSQL (via Convex storage layer) |
| Auth | BetterAuth (already in use) + official Convex component |
| Payments | Keep RevenueCat as-is |
| Upstream sync | Cherry-pick UI changes only, port backend to Convex manually |
| Image storage | Device photo library (primary) + Convex file storage (backup) |
| Migration approach | Incremental, phase by phase |

---

## Phase 1: Foundation (Fork + Infrastructure)

### 1.1 Fork & Git Setup
- Fork `Code-with-Beto/ai-tattoo` to your GitHub account
- Set up dual remotes: `origin` (your fork) + `upstream` (original)
- Create branch `feat/convex-migration`

### 1.2 Self-Hosted Convex on Coolify
- Create `docker/docker-compose.yml` with 3 services:
  - **PostgreSQL** (port 5432)
  - **Convex Backend** (ports 3210 WebSocket, 3211 HTTP actions)
  - **Convex Dashboard** (port 6791, optional)
- Deploy via Coolify's Docker Compose support
- Configure Caddy/Nginx reverse proxy with SSL
- Generate admin key and instance secret

### 1.3 Install Dependencies
- Add: `convex`, `@convex-dev/better-auth`
- Pin `better-auth` to version compatible with Convex component (1.4.9)
- Keep all existing Expo/RN dependencies

### 1.4 Create Convex Directory Structure
```
convex/
  _generated/          # Auto-generated
  convex.config.ts     # App config with BetterAuth component
  auth.config.ts       # Auth config provider
  auth.ts              # BetterAuth instance (replaces lib/auth.ts)
  schema.ts            # Database schema (usage table)
  http.ts              # HTTP router (webhooks + auth routes)
  generation.ts        # AI image generation actions
  prompt.ts            # Prompt improvement action
  usage.ts             # Usage queries + mutations
  subscription.ts      # Sync-subscription mutation
  webhooks.ts          # RevenueCat/Apple webhook processing
  featureRequest.ts    # Slack notification action
  geminiUtils.ts       # Gemini API helpers (from server-utils/)
  imageUtils.ts        # Base64/MIME helpers (from server-utils/)
  validationUtils.ts   # Validation helpers (from server-utils/)
  planLimits.ts        # Plan limit constants
```

---

## Phase 2: Auth Migration

### 2.1 Convex BetterAuth Setup
- Create `convex/convex.config.ts` - register BetterAuth component
- Create `convex/auth.config.ts` - auth config provider
- Create `convex/auth.ts` - BetterAuth instance with Convex adapter
  - Replaces `lib/auth.ts` (Prisma adapter → Convex adapter)
  - Same providers: Google OAuth, Apple Sign-In, Email/Password
  - Same trusted origins, rate limiting config

### 2.2 HTTP Route Registration
- Create `convex/http.ts` - register BetterAuth routes via `authComponent.registerRoutes()`

### 2.3 Client Auth Update
- Modify `lib/auth-client.ts`:
  - Change `baseURL` from Expo API routes to Convex site URL
  - Add `convexClient()` plugin

### 2.4 App Provider Wrapper
- Modify `src/app/_layout.tsx`:
  - Add `ConvexReactClient` + `ConvexProvider`
  - Add `ConvexBetterAuthProvider`
  - Wrap existing providers

### 2.5 Verify
- Test sign in/out with Google, Apple, Email
- Confirm sessions persist correctly

---

## Phase 3: Core API Migration

### 3.1 Usage System → Convex Query + Mutations
- Create `convex/schema.ts` with `usage` table
- Create `convex/usage.ts`:
  - `getUserUsage` → **query** (reactive! auto-updates on all devices)
  - `checkUsage` → **internalQuery** (used by generation actions)
  - `incrementUsage` → **internalMutation**
  - `upsertUsage` → **internalMutation** (manual upsert pattern)

### 3.2 Subscription Sync → Convex Mutation
- Create `convex/subscription.ts`:
  - `syncSubscription` → **mutation** (database writes only, no external calls)
  - Port logic from `src/app/api/user/sync-subscription+api.ts`

### 3.3 Image Generation → Convex Actions
- Create `convex/generation.ts`:
  - `textToImage` → **action** (calls Gemini API)
  - `textAndImageToImage` → **action** (calls Gemini API with reference image)
- Move `server-utils/generation-utils.ts` → `convex/geminiUtils.ts`
- Move image helpers → `convex/imageUtils.ts`
- Move validation helpers → `convex/validationUtils.ts`

**Key Convex pattern**: Actions can call external APIs (Gemini, OpenAI). They access the database via `ctx.runQuery()` and `ctx.runMutation()`.

### 3.4 Prompt Improvement → Helper in Actions
- Create `convex/prompt.ts`:
  - `improvePrompt` → **action** (calls OpenAI API)
  - Or inline within generation actions as helper function

### 3.5 Feature Request → Convex Action
- Create `convex/featureRequest.ts`:
  - `submitFeatureRequest` → **action** (sends Slack notification)

---

## Phase 4: Webhook Migration

### 4.1 RevenueCat Webhook → HTTP Action
- Add route in `convex/http.ts`: `POST /webhook/rc`
- Create `convex/webhooks.ts`:
  - `processRevenueCatEvent` → **internalMutation**
  - Port all event handlers (INITIAL_PURCHASE, RENEWAL, CANCELLATION, etc.)
  - Manual upsert pattern (Convex doesn't have prisma's `upsert`)
- Update RevenueCat dashboard with new webhook URL

### 4.2 Apple Webhook → HTTP Action
- Add route in `convex/http.ts`: `POST /webhook/apple`
- Port Apple notification handling + Slack notification

---

## Phase 5: Client-Side Migration

### 5.1 Replace API Client Layer
- **Remove**: `lib/api-client.ts` (raw HTTP fetches)
- **Remove**: `lib/mutations.ts` (createJsonMutation wrappers)
- **Rewrite**: `lib/nano.ts` to use Convex hooks:
  - `useAction(api.generation.textToImage)` replaces `createJsonMutation`
  - `useQuery(api.usage.getUserUsage)` replaces `apiFetch` (now reactive!)
  - `useMutation(api.subscription.syncSubscription)` replaces mutation helpers

### 5.2 Update All Screens
- Every screen that calls `apiFetch()` or uses mutations from `lib/mutations.ts` needs updating
- Key screens: Home (generation), Settings (usage display), etc.

### 5.3 Image Backup Feature (New)
- After successful generation, optionally store image in Convex file storage
- Use `ctx.storage.store(blob)` in generation action
- Save `storageId` in a new `generatedImages` table
- Device photo library remains primary (no change to current UX)
- Cloud backup is automatic/silent for signed-in users

---

## Phase 6: Cleanup & Deploy

### 6.1 Remove Old Backend
- Remove `src/app/api/` directory (all Expo API routes)
- Remove `server-utils/` directory (moved to convex/)
- Remove `prisma/` directory (schema + migrations)
- Remove Prisma dependencies from package.json

### 6.2 Data Migration
- Export `usage` records from old PostgreSQL
- Import into Convex via migration script
- User re-authentication: BetterAuth recreates user records on first sign-in
- Link old usage records to new users by email

### 6.3 Production Deployment
- Deploy Convex on Hetzner via Coolify (Docker Compose)
- Run `npx convex deploy` to push functions
- Deploy updated Expo app via EAS
- Update RevenueCat webhook URL
- Update Apple webhook URL
- Monitor logs

---

## Infrastructure: Coolify on Hetzner

### Docker Compose Services
```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: convex
      POSTGRES_USER: convex
      POSTGRES_PASSWORD: <secret>
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  convex-backend:
    image: ghcr.io/get-convex/convex-self-hosted:latest
    depends_on: [postgres]
    environment:
      POSTGRES_URL: postgresql://convex:<secret>@postgres:5432/convex
      CONVEX_CLOUD_ORIGIN: https://convex.yourdomain.com
      CONVEX_SITE_ORIGIN: https://convex-site.yourdomain.com
      INSTANCE_NAME: tattoodesignai
      INSTANCE_SECRET: <generated>
    ports:
      - "3210:3210"  # WebSocket + REST
      - "3211:3211"  # HTTP actions
    restart: always

  convex-dashboard:
    image: ghcr.io/get-convex/convex-dashboard:latest
    depends_on: [convex-backend]
    ports:
      - "6791:6791"
    restart: always
```

### Coolify Setup
- Create new "Docker Compose" service in Coolify
- Point to the `docker/docker-compose.yml` file
- Configure domain proxying:
  - `convex.yourdomain.com` → port 3210
  - `convex-site.yourdomain.com` → port 3211
  - `convex-dash.yourdomain.com` → port 6791 (optional)
- Coolify handles SSL via Let's Encrypt automatically

### RAM Estimate
- PostgreSQL: ~500MB
- Convex Backend: ~1-2GB
- **Total: ~2-3GB** (well within 4GB VPS)
- Images flow through as base64 in action responses, NOT stored in RAM

---

## Real-Time Benefits (Free with Convex)

Things that automatically become real-time:
1. **Usage counter** - When a generation completes, usage updates instantly on all devices
2. **Subscription status** - When RevenueCat webhook fires, client sees change immediately
3. **Future: tattoo gallery** - New tattoos appear instantly across devices

---

## Upstream Sync Strategy

When Code-with-Beto adds features:
1. `git fetch upstream`
2. Review their changes: `git diff upstream/main`
3. Cherry-pick UI/screen changes: `git cherry-pick <commit>` (or manual copy)
4. Manually port any new API routes to Convex functions
5. The `convex/` directory will NEVER conflict (it's new to our fork)

**Conflict hotspots**: `lib/auth.ts`, `lib/nano.ts`, `lib/api-client.ts`, `src/app/api/`

---

## Environment Variables

### Convex (set via `npx convex env set`)
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_SECRET`
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `SLACK_WEBHOOK_URL`
- `REVENUECAT_API_KEY`

### Expo App (.env)
- `EXPO_PUBLIC_CONVEX_URL=https://convex.yourdomain.com`
- `EXPO_PUBLIC_CONVEX_SITE_URL=https://convex-site.yourdomain.com`
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID=...`

### Coolify / Docker
- `POSTGRES_URL`
- `CONVEX_CLOUD_ORIGIN`
- `CONVEX_SITE_ORIGIN`
- `INSTANCE_NAME`
- `INSTANCE_SECRET`
