# Default Compatible App Patterns

## Privacy center

Create an in-app privacy center with:

- privacy policy
- data categories collected
- third-party SDK list
- permissions explanations
- account deletion
- data deletion request path
- support contact
- terms
- tracking explanation if applicable

## Review mode

Use review mode only to make the real app testable. It must not hide or change production functionality deceptively.

Good review mode behavior:

- seeded sample data
- unlocked test features
- sandbox payment path
- documented credentials
- clear App Review notes

Bad review mode behavior:

- hiding prohibited content from reviewers
- disabling monetization only for review
- presenting a different app than users receive
- bypassing legal or safety requirements

## Moderation center

For UGC apps, implement:

- report content
- report user
- block user
- content filters
- moderation queue
- support escalation
- abuse response SLA
- policy page
- age-sensitive content controls

## Purchase center

For digital purchases, implement:

- StoreKit product loading
- clear product descriptions
- subscription terms
- purchase confirmation
- restore purchases
- transaction error states
- family sharing behavior when applicable
- review notes listing every product

## Permission education

Before system prompts:

- explain the exact feature requiring access
- ask at the moment of need
- show fallback behavior
- avoid generic copy
- avoid blocking unrelated functionality

## Metadata truth table

For every metadata claim, document the in-app evidence.

| Claim | Metadata location | In-app proof | Reviewer path |
| --- | --- | --- | --- |
| | | | |

## SDK approval gate

Before adding an SDK:

1. Identify its purpose.
2. Identify data collected.
3. Identify data shared.
4. Identify tracking behavior.
5. Check children's data behavior.
6. Check privacy policy obligations.
7. Add it to privacy labels.
8. Remove it if not necessary.
