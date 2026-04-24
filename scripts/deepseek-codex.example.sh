#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  deepseek-codex.example.sh [--stdin] [--model <name>] [--raw] [--help] "<prompt>"

Examples:
  deepseek-codex.example.sh "Summarize this repository"
  printf '%s\n' "Review this diff" | deepseek-codex.example.sh --stdin
  deepseek-codex.example.sh --model deepseek-reasoner "Explain this stack trace"
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

CLI_BIN="${DEEPSEEK_CLI_BIN:-deepseek}"
DEFAULT_MODEL="${DEEPSEEK_MODEL:-deepseek-chat}"
USE_STDIN=0
RAW_MODE=0
MODEL=""
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

require_command "$CLI_BIN"
[[ -n "${DEEPSEEK_API_KEY:-}" ]] || fail "DEEPSEEK_API_KEY is not set"

if [[ -z "$MODEL" ]]; then
  MODEL="$DEFAULT_MODEL"
fi

if [[ "$USE_STDIN" -eq 1 ]]; then
  PROMPT="$(cat)"
fi

[[ -n "$PROMPT" ]] || fail "prompt is empty"

args=()

# Keep the wrapper non-interactive and deterministic for automation.
# Adjust the subcommand/flags below to match the DeepSeek CLI version installed locally.
args+=(chat)
args+=(--model "$MODEL")
args+=(--input "$PROMPT")

if [[ "$RAW_MODE" -eq 1 ]]; then
  args+=(--raw)
fi

exec "$CLI_BIN" "${args[@]}"
