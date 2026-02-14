# Launch Checklist

## App Store Connect (iOS)

- [ ] Create subscription products:
  - `tattoodesignai_weekly` — Weekly plan
  - `tattoodesignai_monthly` — Monthly plan
- [ ] Submit app for review
- [ ] Verify App Store listing is live

## Google Play Console (Android)

- [ ] Create subscription products:
  - `tattoodesignai_weekly` — Weekly plan
  - `tattoodesignai_monthly` — Monthly plan
- [ ] Submit app for review
- [ ] Verify Play Store listing is live

## RevenueCat

- [ ] Add App Store Connect shared secret
- [ ] Add Google Play service account credentials
- [ ] Map subscription product IDs to entitlements
- [ ] Test sandbox purchases on both platforms

## Smart App Link

- [ ] Verify `fahimanwer.com/tattooai` redirects iOS to App Store
- [ ] Verify `fahimanwer.com/tattooai` redirects Android to Play Store
- [ ] Verify `fahimanwer.com/tattooai` shows landing page on desktop
- [ ] Update store URLs in `fahimanwer-portfolio/middleware.ts` if they change

## App Code

- [x] Update share URLs from `fahimanwer.com` to `fahimanwer.com/tattooai`
- [ ] Test share flow on iOS — opens App Store
- [ ] Test share flow on Android — opens Play Store

## Final Verification

- [ ] `curl -I -A "iPhone" https://fahimanwer.com/tattooai` → 302 to App Store
- [ ] `curl -I -A "Android" https://fahimanwer.com/tattooai` → 302 to Play Store
- [ ] `curl -I https://fahimanwer.com/tattooai` → 200 landing page
- [ ] Share from app on real device → correct store opens
