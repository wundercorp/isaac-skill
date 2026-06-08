#!/usr/bin/env bash
set -euo pipefail

HOOK_MODE="pre-push"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode)
      HOOK_MODE="${2:-pre-push}"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

if [[ "$HOOK_MODE" != "pre-commit" && "$HOOK_MODE" != "pre-push" ]]; then
  echo "Hook mode must be pre-commit or pre-push." >&2
  exit 1
fi

if [[ ! -d .git ]]; then
  echo "Run this from the root of a Git repository." >&2
  exit 1
fi

mkdir -p .git/hooks
HOOK_FILE=".git/hooks/$HOOK_MODE"
cat > "$HOOK_FILE" <<'HOOK'
#!/usr/bin/env bash
set -euo pipefail

if [[ -f scripts/check-isaac.mjs ]]; then
  node scripts/check-isaac.mjs
else
  echo "scripts/check-isaac.mjs was not found; skipping Isaac check."
fi
HOOK
chmod +x "$HOOK_FILE"
echo "Installed Isaac $HOOK_MODE hook at $HOOK_FILE"
