#!/usr/bin/env bash

set -euo pipefail

artifact_dir="${1:-dist}"

rm -rf "$artifact_dir"
mkdir -p "$artifact_dir"

cp index.html "$artifact_dir/"
cp guide.html "$artifact_dir/"
cp -R css "$artifact_dir/"
cp -R js "$artifact_dir/"

echo "Prepared Pages artifact in $artifact_dir"