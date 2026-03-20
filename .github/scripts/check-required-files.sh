#!/usr/bin/env bash

set -euo pipefail

required_paths=(
  "index.html"
  "guide.html"
  "css/style.css"
  "js/simulation.js"
)

missing_paths=()

for required_path in "${required_paths[@]}"; do
  if [[ ! -e "$required_path" ]]; then
    missing_paths+=("$required_path")
  fi
done

if (( ${#missing_paths[@]} > 0 )); then
  echo "Missing required site files:"
  printf ' - %s\n' "${missing_paths[@]}"
  exit 1
fi

echo "Required site files are present."