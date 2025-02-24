#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"

# Create template for slow simapp
(
  cd "$SCRIPT_DIR"
  cp -R template template_slow
  chmod +x "$SCRIPT_DIR/template_slow/setup.sh"
  chmod +x "$SCRIPT_DIR/template_slow/run_simd.sh"

  # Slow settings in config.toml
  sed -i "" \
    -e 's/^timeout_broadcast_tx_commit =.*$/timeout_broadcast_tx_commit = "1s"/' \
    -e 's/^timeout_commit =.*$/timeout_commit = "10s"/' \
    "template_slow/.simapp/config/config.toml"
)
