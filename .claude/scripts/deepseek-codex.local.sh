#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  deepseek-codex.local.sh [--stdin] [--model <name>] [--system <text>] [--raw] [--help] "<prompt>"

Examples:
  deepseek-codex.local.sh "Summarize this repository"
  printf '%s\n' "Review this diff" | deepseek-codex.local.sh --stdin
  deepseek-codex.local.sh --model deepseek-reasoner "Explain this stack trace"
EOF
}

fail() {
  printf 'deepseek-codex: %s\n' "$1" >&2
  exit "${2:-1}"
}

require_command() {
  local command_name="$1"
  command -v "$command_name" >/dev/null 2>&1 || fail "command not found: $command_name"
}

require_command curl
require_command jq

BASE_URL="${DEEPSEEK_BASE_URL:-https://api.deepseek.com}"
DEFAULT_MODEL="${DEEPSEEK_MODEL:-deepseek-chat}"
USE_STDIN=0
RAW_MODE=0
MODEL=""
SYSTEM_PROMPT="${DEEPSEEK_SYSTEM_PROMPT:-You are a helpful assistant.}"
PROMPT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stdin)
      USE_STDIN=1
      shift
      ;;
    --model)
      [[ $# -ge 2 ]] || fail "--model requires a value"
      MODEL="$2"
      shift 2
      ;;
    --system)
      [[ $# -ge 2 ]] || fail "--system requires a value"
      SYSTEM_PROMPT="$2"
      shift 2
      ;;
    --raw)
      RAW_MODE=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --*)
      fail "unsupported option: $1"
      ;;
    *)
      [[ -z "$PROMPT" ]] || fail "prompt provided more than once"
      PROMPT="$1"
      shift
      ;;
  esac
done

[[ -n "${DEEPSEEK_API_KEY:-}" ]] || fail "DEEPSEEK_API_KEY is not set"

if [[ -z "$MODEL" ]]; then
  MODEL="$DEFAULT_MODEL"
fi

if [[ "$USE_STDIN" -eq 1 ]]; then
  PROMPT="$(cat)"
fi

[[ -n "$PROMPT" ]] || fail "prompt is empty"

payload="$(jq -n \
  --arg model "$MODEL" \
  --arg system_prompt "$SYSTEM_PROMPT" \
  --arg prompt "$PROMPT" \
  '{
    model: $model,
    messages: [
      {role: "system", content: $system_prompt},
      {role: "user", content: $prompt}
    ],
    stream: false
  }')"

response_file="$(mktemp)"
status_code="$(
  curl -sS \
    -o "$response_file" \
    -w '%{http_code}' \
    -X POST "${BASE_URL%/}/chat/completions" \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
    -d "$payload"
)"

if [[ "$status_code" -lt 200 || "$status_code" -ge 300 ]]; then
  if jq -e '.error.message' "$response_file" >/dev/null 2>&1; then
    fail "API request failed (${status_code}): $(jq -r '.error.message' "$response_file")"
  fi
  fail "API request failed with HTTP ${status_code}"
fi

if [[ "$RAW_MODE" -eq 1 ]]; then
  cat "$response_file"
  rm -f "$response_file"
  exit 0
fi

if jq -e '.choices[0].message.reasoning_content // empty' "$response_file" >/dev/null 2>&1; then
  jq -r '.choices[0].message.reasoning_content' "$response_file" >&2
fi

jq -r '.choices[0].message.content // empty' "$response_file"
rm -f "$response_file"
