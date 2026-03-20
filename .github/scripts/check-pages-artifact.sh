#!/usr/bin/env bash

set -euo pipefail

artifact_dir="${1:-dist}"

if [[ ! -d "$artifact_dir" ]]; then
  echo "Artifact directory does not exist: $artifact_dir"
  exit 1
fi

required_paths=(
  "$artifact_dir/index.html"
  "$artifact_dir/guide.html"
  "$artifact_dir/css/style.css"
  "$artifact_dir/js/simulation.js"
)

missing_paths=()

for required_path in "${required_paths[@]}"; do
  if [[ ! -e "$required_path" ]]; then
    missing_paths+=("$required_path")
  fi
done

if (( ${#missing_paths[@]} > 0 )); then
  echo "Pages artifact is missing required files:"
  printf ' - %s\n' "${missing_paths[@]}"
  exit 1
fi

allowed_entries=(css guide.html index.html js)
unexpected_entries=()

while IFS= read -r entry_path; do
  entry_name="$(basename "$entry_path")"
  is_allowed=false

  for allowed_entry in "${allowed_entries[@]}"; do
    if [[ "$entry_name" == "$allowed_entry" ]]; then
      is_allowed=true
      break
    fi
  done

  if [[ "$is_allowed" == false ]]; then
    unexpected_entries+=("$entry_name")
  fi
done < <(find "$artifact_dir" -mindepth 1 -maxdepth 1 | sort)

if (( ${#unexpected_entries[@]} > 0 )); then
  echo "Pages artifact contains unexpected top-level entries:"
  printf ' - %s\n' "${unexpected_entries[@]}"
  exit 1
fi

echo "Pages artifact contains only the expected site files."