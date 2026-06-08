# Isaac Skill

Builder Studio: https://builderstudio.dev

Isaac is a BuilderStudio-compatible skill for building Apple-platform apps that are compatible by default with Apple App Store Review Guidelines. It helps teams reduce avoidable review friction by designing privacy, metadata, payments, reviewer access, user-generated content moderation, legal readiness, and submission notes into the app before review.

Isaac is independent guidance and does not replace Apple's official App Store Review Guidelines, App Store Connect, legal review, or direct communication with App Review.

Official Apple guidelines: https://developer.apple.com/app-store/review/guidelines/

## Install

Using npm/npx:

```bash
npx --yes skills add https://github.com/wundercorp/isaac-skill --skill isaac
```

Using Yarn:

```bash
yarn dlx skills add https://github.com/wundercorp/isaac-skill --skill isaac
```

## Best for

- Preparing iOS, iPadOS, macOS, visionOS, watchOS, tvOS, and App Clip submissions
- Creating App Store review packets and reviewer notes
- Designing privacy, permissions, account deletion, and SDK disclosure flows
- Checking StoreKit, in-app purchase, subscriptions, trials, credits, tips, and digital goods
- Reviewing metadata, screenshots, preview videos, age ratings, categories, and keywords
- Building user-generated content moderation, report, block, and support flows
- Avoiding thin wrapper, copycat, placeholder, beta, hidden-feature, or misleading app patterns
- Handling high-risk areas such as kids, health, finance, crypto, VPN, MDM, gambling, cannabis, location, ads, tracking, and AI
- Triage after App Review rejection

## Included helper scripts

- `scripts/isaac-audit.mjs` creates App Store review readiness documentation and checklist files.
- `scripts/check-isaac.mjs` checks for review-readiness files and common Apple review risk signals.
- `scripts/install-isaac-hooks.sh` installs a Git hook that runs the Isaac check.
- `scripts/isaac-audit.ps1` is a PowerShell wrapper for Windows users.

## Common commands

```bash
node scripts/isaac-audit.mjs --write
node scripts/isaac-audit.mjs --root ./ios --write --force
node scripts/check-isaac.mjs
bash scripts/install-isaac-hooks.sh --mode pre-push
powershell -ExecutionPolicy Bypass -File scripts/isaac-audit.ps1 -Write
```
