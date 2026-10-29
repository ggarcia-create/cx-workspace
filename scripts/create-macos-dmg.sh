#!/bin/bash
set -euo pipefail

target="${1:?Usage: create-macos-dmg.sh <target>}"
version="$(node -p "require('./package.json').version")"
bundle_dir="src-tauri/target/${target}/release/bundle"
app_path="${bundle_dir}/macos/CX Workspace.app"
dmg_dir="${bundle_dir}/dmg"
dmg_path="${dmg_dir}/CX Workspace_${version}_${target}.dmg"

if [[ ! -d "$app_path" ]]; then
  echo "Built macOS app not found: $app_path" >&2
  exit 1
fi

mkdir -p "$dmg_dir"
staging_dir="$(mktemp -d)"
trap 'rm -rf "$staging_dir"' EXIT
ditto "$app_path" "$staging_dir/CX Workspace.app"
ln -s /Applications "$staging_dir/Applications"
hdiutil create -volname "CX Workspace" -srcfolder "$staging_dir" -ov -format UDZO "$dmg_path"
