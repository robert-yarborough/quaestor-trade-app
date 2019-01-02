#!/usr/bin/env bash

# Export local environments variables.
# ToDO. Clarify path.
export $(cat .env | grep -v \# | xargs)

echo 'Configure drush aliases and Acquia API connect.'
mkdir -p ~/.drush/ ~/.acquia
cp scripts/drush/* ~/.drush/

# This variables SHOULD NOT be in the public files. Enter them in the bitbucket profile
echo '{"email":"'${ACQUIA_API_EMAIL}'","key":"'${ACQUIA_API_KEY}'"}' > ~/.acquia/cloudapi.conf

# Drush aliases and Acquia drush commands aren't available in the app root if application has installed drush in the vendor.
cd ~
drush cc drush