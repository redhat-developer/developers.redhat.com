#! /bin/bash
# Exit on failures
set -e
set -o pipefail

# Run gulp (for now)
$(npm bin)/gulp

# Run npm install in the rhdp theme to pull down the front-end repo and build
cd _docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend
npm start

