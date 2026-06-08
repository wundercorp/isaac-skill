# Isaac App Store Review Checklist

Use this checklist before TestFlight review, App Store submission, and every meaningful update.

## Submission access

- The reviewer can access the app without contacting the developer.
- Required login has a working demo account or a full-featured demo mode.
- Demo credentials are included in review notes.
- Demo data covers all paid, gated, region-specific, hardware-specific, and non-obvious flows.
- Backend services are live, reachable, and seeded for review.
- Required sample QR codes, files, URLs, hardware notes, sandbox accounts, and configuration details are included.

## Product completeness

- No crash on launch.
- No obvious crash in primary flows.
- No placeholder text.
- No empty production pages.
- No broken images, videos, or media.
- No dead support, privacy, terms, subscription, or help links.
- No beta-only language in a public App Store submission.
- No hidden, dormant, undocumented, or misleading features.
- No feature depends on unavailable backend, region, entitlement, or hardware without explanation.

## Metadata truth

- App name is unique and under Apple's current length requirements.
- Subtitle and keywords describe real functionality.
- Description reflects actual app behavior.
- Screenshots show real app screens.
- Preview videos show captured app behavior.
- Age rating answers reflect all content and UGC risk.
- Category matches the app's main purpose.
- Privacy labels match runtime behavior and SDK behavior.
- Review notes describe all non-obvious features and changes.

## Privacy and permissions

- Privacy policy URL exists in App Store Connect and inside the app.
- Privacy policy explains data collected, collection method, use, sharing, retention, deletion, and consent withdrawal.
- Data collection is limited to the app's real purpose.
- Every permission request has a feature-specific purpose string.
- Permission-denied alternatives exist where possible.
- Account deletion exists inside the app if account creation exists.
- Third-party SDK data collection and sharing are inventoried.
- Tracking behavior is correctly handled through App Tracking Transparency when applicable.
- Sensitive data is not shared with third-party AI, ads, analytics, or SDKs without consent and legal clearance.

## Payments and business model

- Digital goods, digital features, subscriptions, credits, and digital content unlocks use StoreKit unless an exception or entitlement applies.
- Restore purchases exists for restorable products.
- Subscriptions disclose duration, price, renewal, trial, cancellation, and feature access.
- Randomized paid items disclose odds before purchase.
- No hidden external purchase path exists for digital content where not permitted.
- No forced rating, review, app download, or store action unlocks functionality.
- Monetization is clearly disclosed in metadata and review notes.

## User-generated content

- Content policy exists.
- Users can report content.
- Users can block abusive users.
- Moderation workflow exists and is monitored.
- Developer contact information is published.
- Objectionable content is filtered or hidden by default where appropriate.
- Mature content and creator content have appropriate age handling.
- Purchase requirements for creator content are disclosed.

## Kids and children

- The app does not imply it is for kids unless it is actually submitted in the Kids Category.
- Kids Category apps avoid third-party analytics and advertising unless a narrow documented exception applies.
- Parental gates protect links, purchases, and distractions where required.
- Child data collection is minimized and legally reviewed.
- Privacy policy reflects children's data handling.

## Legal and regulated features

- Legal review is complete for every distribution territory when regulated functionality exists.
- Required licenses, approvals, clearances, and authorizations are documented.
- Financial, crypto, health, gambling, cannabis, VPN, MDM, travel, law-enforcement, and emergency features are treated as high-risk.
- Location and geo-restriction behavior matches legal requirements.
- Intellectual property rights are documented for third-party brands, APIs, content, music, video, images, trademarks, and datasets.
- The app does not imply Apple endorsement.

## Ads and tracking

- Ads match the app age rating.
- Ads are visually distinct from content.
- Interstitials have obvious close or skip controls.
- Users can report inappropriate ads.
- Sensitive data is not used for targeted advertising.
- Tracking consent flow is correct and not coercive.

## Reviewer notes

- App purpose is clear.
- Version changes are listed.
- Login or demo instructions are complete.
- Feature paths are step-by-step.
- IAP and subscriptions are explained.
- Permissions are explained.
- UGC moderation is explained.
- Regulated features and supporting evidence are explained.
- Known limitations are disclosed without disguising incomplete functionality.
