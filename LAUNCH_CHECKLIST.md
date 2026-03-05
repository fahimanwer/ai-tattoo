# Launch Checklist -- Tattoo Design AI Pro Pricing

## Pricing Model

| Plan             | Price       | Trial        | Offering        |
|------------------|-------------|--------------|-----------------|
| Pro Weekly       | $9.99/week  | None         | `pro_default`   |
| Pro Annual       | $59.99/year | 7-day free   | `pro_default`   |
| Offer Weekly     | $6.99/week  | None         | `pro_offer`     |
| Offer Annual     | $39.99/year | 7-day free   | `pro_offer`     |

Generation limits: 35/period (weekly), 150/30-day period (annual).

---

## 1. RevenueCat Setup (DONE)

- [x] Project created: `proj2ee3083e`
- [x] Apps registered:
  - [x] Test Store: `app2d3fb62ca5`
  - [x] iOS (App Store): `appe347df0306`
  - [x] Android (Play Store): `appb5c9e65876`
- [x] Entitlement created: `pro` (`entlfe601e9dfd`)
- [x] Offering `pro_default` created (`ofrng911dcc179f`) -- main paywall
- [x] Offering `pro_offer` created (`ofrng34980cc400`) -- discount paywall
- [x] Products created and attached to packages across all 3 stores
- [x] Products attached to `pro` entitlement

---

## 2. App Store Connect -- iOS

### Product IDs

| Product ID                          | Type         | Price       | Trial      |
|-------------------------------------|--------------|-------------|------------|
| `tattoodesignai_pro_weekly`         | Auto-renew   | $9.99/week  | None       |
| `tattoodesignai_pro_annual`         | Auto-renew   | $59.99/year | 7-day free |
| `tattoodesignai_offer_weekly`       | Auto-renew   | $6.99/week  | None       |
| `tattoodesignai_offer_annual`       | Auto-renew   | $39.99/year | 7-day free |

### Setup Steps

- [x] Create subscription group "Tattoo Design AI Pro" (group ID: 21935333)
- [x] Create `tattoodesignai_pro_weekly` — $9.99/week (READY_TO_SUBMIT)
- [x] Create `tattoodesignai_pro_annual` — $59.99/year, 7-day free trial (READY_TO_SUBMIT)
- [x] Create `tattoodesignai_offer_weekly` — $6.99/week (READY_TO_SUBMIT)
- [x] Create `tattoodesignai_offer_annual` — $39.99/year, 7-day free trial (READY_TO_SUBMIT)
- [ ] Set subscription group ranking (annual above weekly for upgrade path)
- [ ] Add App Store Connect shared secret to RevenueCat
- [ ] Submit subscriptions for review (can submit with app binary or independently)

---

## 3. Google Play Console -- Android

### Product IDs & Base Plans

| Subscription ID                     | Base Plan ID     | Price       | Trial      |
|-------------------------------------|------------------|-------------|------------|
| `tattoodesignai_pro_weekly`         | `pro-weekly`     | $9.99/week  | None       |
| `tattoodesignai_pro_annual`         | `pro-annual`     | $59.99/year | 7-day free |
| `tattoodesignai_offer_weekly`       | `offer-weekly`   | $6.99/week  | None       |
| `tattoodesignai_offer_annual`       | `offer-annual`   | $39.99/year | 7-day free |

### Prep (DONE)

- [x] ASO metadata updated to annual pricing across 34 locales
- [x] Fastlane metadata generated (`fastlane/metadata/android/`)
- [x] Subscription JSON configs generated (`tmp/gplay-subs/`)
- [x] EAS submit config added for Android (`eas.json`)
- [x] RevenueCat Google API key set in `.env.local`
- [x] RevenueCat Android app registered (`appb5c9e65876`)
- [x] RevenueCat Android products created (4 Pro v3 products)

### Manual Steps

- [ ] Create app on Google Play Console (play.google.com/console → Create App)
- [ ] Complete content declarations (privacy policy, ads, target audience, content rating)

### CLI Steps (after app exists on Play Console)

```bash
# 1. Authenticate gplay CLI
gplay auth login --service-account ./google-play-service-account.json

# 2. Build & upload first AAB
eas build --platform android --profile production
gplay release --package com.fahimanwer.tattooai --track internal --bundle <path-to-aab>

# 3. Create subscriptions
gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_pro_weekly.json
gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_pro_annual.json
gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_offer_weekly.json
gplay subscriptions create --package com.fahimanwer.tattooai --json @tmp/gplay-subs/sub_offer_annual.json

# 4. Create free trial offers on annual plans
gplay offers create --package com.fahimanwer.tattooai --product-id tattoodesignai_pro_annual --base-plan pro-annual --json @tmp/gplay-subs/offer_pro_annual_trial.json
gplay offers create --package com.fahimanwer.tattooai --product-id tattoodesignai_offer_annual --base-plan offer-annual --json @tmp/gplay-subs/offer_offer_annual_trial.json

# 5. Sync localized metadata (34 locales)
gplay sync import-listings --package com.fahimanwer.tattooai --dir ./fastlane/metadata/android
```

### Post-CLI Verification

- [ ] `gplay subscriptions list --package com.fahimanwer.tattooai` shows 4 subs
- [ ] Annual plans have 7-day free trial offers
- [ ] 34 locales synced to store listing
- [ ] Add Google Play service account credentials to RevenueCat dashboard
- [ ] Verify product import in RevenueCat dashboard

---

## 4. Sandbox Testing -- iOS

### Main Paywall (`pro_default`)

- [ ] Paywall displays $9.99/wk and $59.99/yr prices
- [ ] Annual plan shows "7-DAY FREE TRIAL" badge
- [ ] Selecting annual plan: CTA reads "Start 7 days free trial"
- [ ] Selecting weekly plan: CTA reads "Subscribe" (no trial language)
- [ ] Purchase weekly: charge appears immediately, entitlement granted
- [ ] Purchase annual: trial starts, no charge for 7 days, entitlement granted

### Discount Paywall (`pro_offer`)

- [ ] Dismiss main paywall
- [ ] Use free generation credit
- [ ] Trigger 2nd generation: discount paywall appears
- [ ] Discount paywall displays $6.99/wk and $39.99/yr prices
- [ ] Annual discount plan shows "7-DAY FREE TRIAL" badge
- [ ] Purchase completes and grants `pro` entitlement

### Entitlement & Backend

- [ ] Webhook fires on purchase and creates correct usage record
- [ ] Usage record contains `pro` entitlement
- [ ] Weekly plans enforce 35 generations/period
- [ ] Annual plans enforce 150 generations/30-day period
- [ ] Generation counter resets at period renewal

### Profile & Account State

- [ ] Profile shows correct plan name (Pro Weekly / Pro Annual)
- [ ] Profile shows trial status when on annual free trial
- [ ] Profile shows next renewal date
- [ ] Cancellation flow works: subscription expires at period end
- [ ] Restore purchases works for previously subscribed users
- [ ] Upgrade from weekly to annual works (prorated)

---

## 5. Sandbox Testing -- Android

- [ ] Repeat all checks from section 4 on Android device/emulator
- [ ] Verify Google Play billing dialog appears correctly
- [ ] Test with Google Play sandbox test accounts
- [ ] Verify real-time developer notifications (RTDN) reach RevenueCat

---

## 6. Smart App Link

- [ ] Verify `fahimanwer.com/tattooai` redirects iOS to App Store
- [ ] Verify `fahimanwer.com/tattooai` redirects Android to Play Store
- [ ] Verify `fahimanwer.com/tattooai` shows landing page on desktop
- [ ] Update store URLs in `fahimanwer-portfolio/middleware.ts` if they change

### Verification Commands

```bash
curl -I -A "iPhone" https://fahimanwer.com/tattooai    # expect 302 -> App Store
curl -I -A "Android" https://fahimanwer.com/tattooai   # expect 302 -> Play Store
curl -I https://fahimanwer.com/tattooai                # expect 200 landing page
```

---

## 7. App Code

- [x] Update share URLs from `fahimanwer.com` to `fahimanwer.com/tattooai`
- [ ] Paywall reads offerings from RevenueCat (not hardcoded product IDs)
- [ ] Main paywall fetches `pro_default` offering
- [ ] Discount paywall fetches `pro_offer` offering
- [ ] Trial eligibility check works (hide trial badge for ineligible users)
- [ ] Test share flow on iOS: opens App Store
- [ ] Test share flow on Android: opens Play Store

---

## 8. Post-Deploy Cleanup

### Old Entitlements to Remove

- [ ] Detach all products from old `AI Tattoo Pro` entitlement
- [ ] Delete `AI Tattoo Pro` entitlement
- [ ] Detach all products from old `premium` entitlement
- [ ] Delete `premium` entitlement

### Old Offerings to Remove

- [ ] Delete `v2_default` offering
- [ ] Delete `default` offering

### Backward Compatibility

- [ ] Verify existing subscribers on old product IDs retain access
- [ ] Old product IDs still resolve to `pro` entitlement during transition
- [ ] Grace period for migration: keep old products mapped until no active subs remain

---

## 9. Production Go-Live

- [ ] Flip RevenueCat from sandbox to production mode
- [ ] Verify production webhook endpoint is configured
- [ ] Monitor first 10 real purchases for correct entitlement granting
- [ ] Confirm revenue appears in RevenueCat dashboard
- [ ] Confirm revenue appears in App Store Connect / Play Console
- [ ] Check for any StoreKit error logs in production

---

## 10. Ad Attribution & SDK Setup

### Facebook SDK

- [x] Replace `YOUR_FB_APP_ID` and `YOUR_FB_CLIENT_TOKEN` in `app.json` with real values from Meta Business Suite
- [x] Verify `advertiserIDCollectionEnabled` and `autoLogAppEventsEnabled` are `true` in `app.json`
- [x] `Purchases.collectDeviceIdentifiers()` fires after RevenueCat configure
- [x] `Purchases.setFBAnonymousID()` fires after RevenueCat configure
- [ ] Add **iPhone Store ID** (`6759157248`) to Meta Developer Dashboard → iOS settings (after app is published on App Store)
- [ ] Add **Android Package Name** (`com.fahimanwer.tattooai`) to Meta Developer Dashboard → Add Platform → Android
- [ ] Enable **Meta** integration in RevenueCat dashboard (Integrations → Meta)
- [ ] Verify install events appear in Meta Events Manager

### TikTok Business SDK

- [ ] Set `EXPO_PUBLIC_TIKTOK_APP_ID` and `EXPO_PUBLIC_TIKTOK_TT_APP_ID` in `.env.local`
- [ ] TikTok SDK initializes on both iOS and Android (check console logs)
- [ ] Enable **TikTok** integration in RevenueCat dashboard (Integrations → TikTok)
- [ ] Verify events appear in TikTok Events Manager

### App Tracking Transparency (iOS)

- [ ] ATT permission dialog shows on first iOS app launch
- [ ] Granting ATT enables `Settings.setAdvertiserTrackingEnabled(true)`
- [ ] Denying ATT sets `Settings.setAdvertiserTrackingEnabled(false)`
- [ ] App works correctly regardless of ATT choice

### SKAdNetwork (iOS)

- [ ] Meta SKAdNetwork IDs in `app.json` → `infoPlist.SKAdNetworkItems` (`v9wttpbfk9`, `n38lu8286q`)
- [ ] TikTok/Pangle SKAdNetwork IDs in `app.json` → `infoPlist.SKAdNetworkItems` (`238da6jt44`, `22mmun2rn5`)
- [ ] Verify SKAdNetwork postbacks reach Meta and TikTok after test installs

### RevenueCat Server-Side Integrations (Dashboard)

- [ ] Enable Meta integration in RevenueCat → sends purchase events to Meta Conversions API
- [ ] Enable TikTok integration in RevenueCat → sends purchase events to TikTok Events API
- [ ] Verify purchase events appear in both Meta and TikTok dashboards after test purchase
