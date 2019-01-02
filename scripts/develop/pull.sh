#!/usr/bin/env bash

cd ${APP_ROOT}

# Export local environments variables.
export $(cat .env | grep -v \# | xargs)

# Install all dependencies.
composer install

cd ${PROJECT_ROOT}

echo 'Preview and import drupal configs.'
../vendor/bin/drush config-import -y
../vendor/bin/drush updatedb -y
../vendor/bin/drush entity-updates -y
../vendor/bin/drush cache-rebuild