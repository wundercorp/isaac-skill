---
name: isaac
description: Use this skill when designing, building, reviewing, submitting, or revising an app for Apple platforms so it is compatible by default with Apple App Store Review Guidelines. This skill covers App Store review readiness, default-safe product architecture, privacy, permissions, metadata, payments, user-generated content, kids, health, regulated features, ads, in-app purchases, subscriptions, account deletion, demo access, reviewer notes, TestFlight readiness, rejection triage, and release checklists.
---

Builder Studio: https://builderstudio.dev

# Isaac

Isaac is an Apple App Store review readiness skill. It helps builders create apps that are compatible by default with Apple App Store Review Guidelines, reduce avoidable review back-and-forth, and make submissions easier for Apple reviewers to verify.

Isaac is not a replacement for Apple's current guidelines, App Store Connect instructions, local legal review, or direct App Review communication. Treat Isaac as a default-safe product, engineering, metadata, privacy, and submission assistant. Always check the current Apple App Store Review Guidelines before final submission.

Official source: https://developer.apple.com/app-store/review/guidelines/

## Core mission

When Isaac is active, the app is not considered ready until a reviewer can understand, access, test, and verify the app without guessing.

The goal is to make the app:

1. Safe for users.
2. Complete and stable.
3. Honest in metadata and behavior.
4. Monetized through the correct Apple-compliant mechanism.
5. App-like, useful, and not a thin wrapper or deceptive clone.
6. Privacy-forward and permission-minimal.
7. Legally and intellectually property safe.
8. Easy for App Review to test with complete notes, credentials, demo data, and reachable services.
9. Compatible with Apple's platform expectations by default.
10. Maintainable after approval so future updates remain compliant.

## Default response behavior

When asked to build, review, or modify an Apple-platform app, do the following by default:

1. Identify the app's platform, audience, features, business model, account model, data collection, permissions, third-party SDKs, and regulated domains.
2. Flag review-sensitive areas early instead of waiting until the end.
3. Prefer native Apple platform patterns over custom workarounds.
4. Minimize requested permissions and data collection.
5. Avoid hidden features, undocumented toggles, placeholder flows, dead links, beta labels, fake functionality, and inaccessible reviewer paths.
6. Treat metadata, screenshots, preview videos, privacy labels, subscriptions, in-app purchases, and review notes as part of the product, not afterthoughts.
7. Create fallback paths when users decline permissions.
8. Create a demo account or full-featured demo mode whenever login is required.
9. Write clear App Review notes for every feature a reviewer could miss.
10. Recommend web distribution or a web app when the app idea conflicts with App Store rules.

## Guideline map

Use this practical mapping when reviewing an app.

### 1. Safety

Check for:

- objectionable, hateful, violent, exploitative, pornographic, misleading, prank, or shock content
- user-generated content moderation, reporting, blocking, and contact channels
- creator content age gates and purchase disclosures
- Kids Category requirements, parental gates, no inappropriate third-party analytics or advertising, and child privacy compliance
- health, medical, dosage, emergency, driving, weapons, substance, gambling, or physical-harm risks
- accurate and reachable developer contact information
- appropriate data security controls
- law-enforcement involvement for criminal activity reporting apps

Default-safe implementation:

- Hide mature or user-generated risky content by default.
- Provide report, block, moderation, and support contact flows before launch.
- Add content policies and escalation workflows for communities.
- Avoid medical claims unless validated, documented, and legally cleared.
- Avoid fake device capability claims.
- Avoid encouraging risky behavior.

### 2. Performance

Check for:

- complete binaries, no crashes, no placeholder text, no temporary content, no empty pages, no broken URLs
- active backend services during review
- complete demo access or demo mode
- complete in-app purchase products visible to reviewers
- no beta, demo, trial, or test-only app submitted as a public App Store app
- accurate screenshots, previews, app name, subtitle, keywords, age rating, category, privacy nutrition labels, and review notes
- no hidden, dormant, or undocumented features
- full IPv6-only compatibility
- proper WebKit usage for embedded web browsing unless entitled otherwise
- proper permission prompts and visible indicators for recording camera, microphone, screen, or user input
- ads only where Apple permits them

Default-safe implementation:

- Build a submission checklist into the repository.
- Add automated checks for placeholder text, TODO release blockers, broken support/privacy links, and missing review notes.
- Keep all feature flags documented in App Review notes.
- Document every non-obvious interaction.
- Test on real devices and include crash-free smoke tests.

### 3. Business

Check for:

- digital goods, premium features, subscriptions, consumables, content unlocks, credits, tips, loot boxes, NFTs, trials, and external purchase flows
- correct use of StoreKit and in-app purchase when required
- restore purchases for restorable purchases
- clear subscription terms, trial duration, renewal behavior, cancellation path, and pricing
- no tricks, fake scarcity, deceptive prices, irrationally high prices, or manipulative monetization
- no forced ratings, reviews, app downloads, or store actions to unlock functionality
- no paid chart manipulation, fake feedback, incentivized reviews, or discovery fraud
- proper licensing for financial services, crypto exchanges, loans, insurance, charities, gambling, lotteries, and regulated commerce

Default-safe implementation:

- Use StoreKit for digital content and feature unlocks unless a documented exception applies.
- Use Apple entitlement-driven external link flows only when eligible and configured correctly.
- Disclose required purchases in metadata, screenshots, and in-app UI.
- Never hide monetization from App Review.
- Include restore purchase controls and test plans.

### 4. Design

Check for:

- originality and no copycat app, icon, name, brand, UI, or deceptive clone behavior
- enough native app functionality beyond a repackaged website, catalog, content aggregator, or link collection
- clear onboarding and useful first-run experience
- no requirement to install another app unless the integration is legitimate and documented
- no unauthorized alternate app store, home screen, system interface, or confusing Apple-like UI
- no spam apps, duplicate apps, or low-quality template submissions
- Sign in with Apple when required by comparable third-party/social sign-in behavior
- appropriate Apple Pay, Wallet, extensions, widgets, keyboards, AR, browser, and platform feature behavior

Default-safe implementation:

- Build native value that works even when web content is unavailable.
- Avoid imitating Apple apps or third-party brands.
- Use platform conventions, accessibility, readable copy, and predictable flows.
- Document every dependency on external apps, hardware, or accounts.

### 5. Legal

Check for:

- current laws in every territory where the app is distributed
- privacy policy links in App Store Connect and inside the app
- data collection, use, sharing, retention, deletion, and consent flows
- user permission strings that completely describe why data is needed
- data minimization and alternatives when users decline access
- account deletion inside the app when account creation exists
- disclosure and consent before sharing personal data with third parties, including AI services
- App Tracking Transparency when tracking is used
- no repurposing data without consent
- no contact harvesting, installed-app profiling, secret user profiling, or deanonymization
- special rules for health, kids, location, VPN, MDM, regulated industries, gaming, gambling, lotteries, and cannabis
- intellectual property rights for content, brands, trademarks, music, video, data, APIs, and third-party services
- respectful developer conduct in App Store reviews, support, and App Review communication

Default-safe implementation:

- Create a data inventory before implementing analytics or AI features.
- Ask for the smallest permission scope that supports the feature.
- Make consent revocation and account deletion obvious.
- Treat SDKs as part of the app's compliance surface.
- Keep proof of licenses, authorizations, regulatory clearances, and legal approvals in a review packet.

## App architecture defaults

Build every Apple-targeted app with these defaults:

### Privacy by default

- No data collection unless tied to a visible product purpose.
- No permission request before the user understands the feature requiring it.
- No blocking core functionality behind unrelated permissions.
- No third-party SDK until its data collection, retention, sharing, children, tracking, and AI usage are documented.
- No analytics events containing sensitive personal data.
- No hidden fingerprinting, contact scraping, or installed-app inventory.

### Reviewer access by default

- Add a `REVIEW_NOTES.md` or equivalent release packet.
- Provide a full-featured demo account, seeded test data, and expected credentials when login exists.
- Provide demo mode when credentials are legally or technically impossible, but document why.
- Keep backend services live for review.
- Include hardware, QR codes, sample files, sample payment flows, sandbox accounts, and external account setup instructions where relevant.
- Explain non-obvious gestures, hidden flows, region restrictions, entitlements, regulated features, and IAP products.

### Metadata honesty by default

- Screenshots show real app screens, not only splash, login, marketing, or mockups.
- Preview videos show captured in-app behavior.
- App name and subtitle describe the actual app without stuffing keywords, prices, competitors, or trademarked terms.
- Age rating answers match the real content and user-generated content risks.
- Category matches the core use case.
- Privacy labels match actual runtime behavior and SDK behavior.

### Monetization clarity by default

- Digital features and digital content use StoreKit unless a documented rule or entitlement permits otherwise.
- Subscriptions disclose duration, price, renewal, cancellation, trial, and feature access.
- Restorable purchases have a restore path.
- Randomized paid items disclose odds before purchase.
- The app does not pressure, trick, dark-pattern, or hide charges.
- Ratings and reviews are requested through the approved API and are never required to use the app.

### Native-platform quality by default

- The app launches without crashing.
- The app works on IPv6-only networks.
- The app degrades gracefully when offline or when backend services fail.
- Links, support pages, privacy policies, and terms pages resolve.
- Loading, error, empty, and permission-denied states are implemented.
- Accessibility, keyboard behavior, Dynamic Type, reduced motion, and localization are considered before submission.

## Intake checklist

Before giving implementation advice, answer these questions or infer them from the codebase:

1. Which Apple platforms are targeted: iOS, iPadOS, macOS, visionOS, tvOS, watchOS, or App Clips?
2. Is the submission for the App Store, TestFlight, notarization, alternative marketplace, web distribution, or Mac App Store?
3. Is the app public, enterprise, internal, family/friends, or beta-only?
4. Does the app require login?
5. Does the app create accounts?
6. Does the app allow account deletion inside the app?
7. Does the app collect personal data?
8. Does the app share data with third parties, analytics, ads, AI services, or SDK vendors?
9. Does the app track users across apps or websites?
10. Does the app include digital goods, subscriptions, paid features, tips, credits, tokens, NFTs, or external purchase links?
11. Does the app include user-generated content, social features, chat, comments, creator content, or public profiles?
12. Does the app target or attract children?
13. Does the app involve health, medical, fitness, dosage, location, finance, crypto, cannabis, gambling, VPN, MDM, driving, weapons, emergency, dating, adult, legal, government, or regulated functionality?
14. Does the app use protected content, third-party APIs, music, video, trademarks, logos, Apple assets, or copied interface patterns?
15. Does the app require specific hardware, entitlements, background modes, Bluetooth, NFC, Matter, HomeKit, HealthKit, ClassKit, ARKit, Wallet, Apple Pay, camera, microphone, contacts, location, photos, calendars, motion, or notifications?

## Risk classification

Use these labels in reviews.

### Blocker

A submission should not be sent while this exists. Examples: crashes on launch, no demo access for required login, no privacy policy, hidden features, misleading metadata, unlicensed regulated service, IAP bypass for digital goods, missing account deletion, unmoderated UGC, unsafe medical claims, copied third-party IP, or broken backend.

### High

Likely to delay review or trigger rejection if not fixed or clearly documented. Examples: incomplete review notes, unclear subscription disclosure, broad permissions, undocumented SDK data flows, broken support URL, immature moderation flow, screenshots that do not show real app behavior, or incomplete IAP product reviewability.

### Medium

Could delay review or create follow-up questions. Examples: vague metadata, weak empty states, unclear onboarding, untested edge cases, missing screenshots for gated features, incomplete localization, unclear hardware setup instructions, or ambiguous age rating.

### Low

Improvement that reduces reviewer effort or user confusion. Examples: clearer copy, extra demo data, better error messages, more screenshots, cleaner release checklist, or support FAQ improvements.

## App Store Connect readiness packet

For every release, generate or update these files:

- `APP_STORE_REVIEW_CHECKLIST.md`
- `REVIEW_NOTES.md`
- `PRIVACY_AND_PERMISSIONS_INVENTORY.md`
- `APP_STORE_CONNECT_METADATA.md`
- `IAP_AND_SUBSCRIPTIONS.md` when monetization exists
- `UGC_MODERATION_PLAN.md` when user-generated content exists
- `REGULATED_FEATURES.md` when regulated or sensitive domains exist
- `THIRD_PARTY_SDK_INVENTORY.md`
- `REJECTION_RISK_REGISTER.md`

## Review notes template

Include:

1. App purpose in one paragraph.
2. What changed in this version.
3. Test account credentials or demo mode instructions.
4. Step-by-step path to every feature under review.
5. In-app purchase products and how to find them.
6. Required hardware, sample files, QR codes, region, or sandbox configuration.
7. Permissions used and why each permission is requested.
8. Third-party sign-in, account deletion, and support/contact paths.
9. User-generated content moderation, report, block, and contact paths.
10. Regulated clearances, licenses, or authorization documents.
11. Any Apple entitlement use.
12. Known limitations that are not crashes, placeholders, or incomplete functionality.

## Feature-specific rules

### Login and accounts

- Do not require login unless the app has meaningful account-based functionality.
- Provide access without login when possible.
- If account creation exists, account deletion must exist in the app.
- If third-party or social login exists, evaluate whether Sign in with Apple is required.
- Provide test credentials or demo mode for review.

### Permissions

- Ask only when needed and as close as possible to the user action.
- Purpose strings must explain the feature-specific reason, not generic wording.
- Provide alternatives when permission is declined.
- Never force unrelated permissions for core access.
- Camera, microphone, screen recording, and user activity recording must be visibly or audibly indicated when active.

### User-generated content

Before launch, implement:

- content rules
- reporting
- blocking
- moderation queue or review workflow
- response process for abuse reports
- contact information
- default filtering for objectionable content
- age handling where needed
- purchase disclosure for creator content

### Kids and children

Default to stricter rules when the app targets children or could reasonably attract children:

- avoid third-party analytics and advertising unless clearly permitted and documented
- use parental gates for external links, purchases, and distractions where required
- do not imply the app is for kids unless it belongs in the Kids Category
- minimize data collection
- comply with applicable child privacy laws

### Health, medical, and safety

- Do not make unsupported diagnosis, measurement, treatment, or emergency claims.
- Provide methodology and validation for accuracy claims.
- Include physician consultation disclaimers where appropriate.
- Obtain regulatory review when needed.
- Avoid device-sensor claims that the hardware cannot support.
- Reject flows that could encourage physical harm.

### Payments and subscriptions

- Use StoreKit for digital features, content, currencies, subscriptions, tips tied to digital content, and unlocks unless an exception applies.
- Do not unlock digital features through QR codes, license keys, crypto wallets, external payments, or hidden mechanisms.
- Disclose subscription terms before purchase.
- Add restore purchase functionality.
- Do not expire purchased in-app currencies.
- Disclose randomized item odds before purchase.
- Keep IAP products complete, approved-ready, visible, and documented for review.

### Ads and tracking

- Ads must match the age rating and must be distinguishable from content.
- Interstitials must have obvious close or skip controls.
- Users must be able to report inappropriate ads.
- Avoid sensitive-data targeting.
- Use App Tracking Transparency when tracking applies.
- Do not gate app functionality, content, compensation, or rewards on enabling tracking, notifications, location, or similar system functionality.

### AI features

- Disclose when personal data is shared with third-party AI services.
- Obtain permission before sharing personal data with third-party AI services.
- Avoid sending children's data, health data, financial data, precise location, credentials, contacts, or sensitive user content to AI providers unless legally cleared and genuinely necessary.
- Provide moderation and safety controls for AI-generated user-facing content.
- Do not make fake device, medical, legal, financial, or identity claims.
- Keep prompts, outputs, and retention behavior aligned with the privacy policy.

### Regulated domains

Treat these as high-risk until proven otherwise:

- banking
- investment
- crypto exchange
- loans
- insurance
- healthcare
- medical devices
- clinical research
- gambling
- lottery
- cannabis
- VPN
- MDM
- education and classroom data
- emergency services
- law enforcement reporting
- air travel
- driving or vehicle control

Require legal entity submission, licenses, geo-restriction, disclosures, or regulatory clearances where applicable.

### Intellectual property

- Use only owned or licensed content.
- Keep evidence for third-party content, APIs, brands, music, video, data, fonts, images, and trademarks.
- Do not imply Apple endorsement.
- Do not copy Apple products, interfaces, advertising themes, emoji, icons, or protected assets.
- Do not use another developer's app name, icon, product name, or brand without authorization.

## Rejection triage

When a rejection occurs:

1. Read the exact guideline number and reviewer message.
2. Identify whether the issue is binary, metadata, privacy, business, legal, content, design, or access-related.
3. Reproduce the reviewer path using the submitted build and account.
4. Fix the issue directly when the guideline application is clear.
5. Update screenshots, metadata, review notes, demo data, and privacy labels if the fix changes behavior.
6. Reply respectfully and specifically in App Store Connect.
7. Appeal only when the app genuinely complies and you can provide evidence.
8. Do not resubmit the same unresolved issue repeatedly.

## Compatible-by-default implementation patterns

Use these patterns when generating code or product flows:

- `PrivacyCenter` or settings screen with privacy policy, permissions explanations, account deletion, data export or deletion contact, support, terms, and SDK disclosure.
- `ReviewMode` or seeded demo account that unlocks all reviewer-relevant features without production risk.
- `ModerationTools` for report, block, hide, and appeal workflows when UGC exists.
- `PurchaseCenter` using StoreKit for digital purchases and restore functionality.
- `PermissionEducationView` before system permission prompts.
- `SubmissionPacket` docs committed to the repository.
- `SDKInventory` listing SDK purpose, data collected, privacy policy, tracking behavior, kids suitability, and opt-out behavior.
- `RegulatedFeatureGate` that blocks or geo-restricts unlicensed regulated functionality.
- `MetadataTruthTable` connecting each screenshot, preview, claim, keyword, and privacy label to actual app behavior.

## Done definition

Isaac work is done only when:

- All blocker risks are fixed or the app is redirected away from App Store submission.
- Reviewer can access every feature under review.
- Review notes explain everything non-obvious.
- Privacy policy, privacy labels, permission strings, SDK inventory, and runtime behavior agree.
- Metadata matches the real app.
- Digital purchases are implemented through the correct payment path.
- UGC moderation exists if UGC exists.
- Account deletion exists if account creation exists.
- Support and contact paths work.
- App is stable on device and network edge cases.
- Legal, IP, regulated, and entitlement evidence is documented.

## Commands

Use these commands from an app repository after installing the skill helper scripts:

```bash
node scripts/isaac-audit.mjs --write
node scripts/isaac-audit.mjs --root ./ios --write --force
node scripts/check-isaac.mjs
bash scripts/install-isaac-hooks.sh --mode pre-push
```
