#!/usr/bin/env bash

cd ${APP_ROOT}

# Export local environments variables.
export $(cat .env | grep -v \# | xargs)

# Install all dependencies.
composer install

# Install Drupal
echo "Installing Drupal. It will take several minutes."
vendor/bin/drush si minimal -y --db-url=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:3306/${DB_NAME} --site-name="Drupal 8 Lightning" --site-mail="admin@example.com" --account-name="admin" --account-mail="admin@example.com" --account-pass="1111"

sudo chmod -R 777 ${PROJECT_ROOT}

# Enable developer mode.
cd ${PROJECT_ROOT} && ../vendor/bin/drupal site:mode dev && cd ..

# Set up config sync folder.
mkdir -p config/sync

# ToDo. Check if this row is already present in the settings.php
if [ -e docroot/sites/default/settings.php ]; then
  echo "\$config_directories[CONFIG_SYNC_DIRECTORY] = '../config/sync';" >> docroot/sites/default/settings.php;
fi

# Prepare the files directory for installation
if [ ! -d docroot/sites/default/files ]
  then
    mkdir -m777 docroot/sites/default/files
fi

# Create custom modules and tests folder.
mkdir -p ${PROJECT_ROOT}/modules/custom ${PROJECT_ROOT}/sites/default/files/tests

# Pull blank theme for D8.
# ToDo. Add autorename for theming files.
if [ ! -d "${PROJECT_ROOT}/themes/custom/${PROJECT_NAME}" ] || [ -z "$(ls -A ${PROJECT_ROOT}/themes/custom/${PROJECT_NAME})" ]; then
  # We have to use `clone` + rm instead of `archive` cause protocol error
  git clone https://alex_lyalyuk@bitbucket.org/alex_lyalyuk/drupal-8-base-theme.git ${PROJECT_ROOT}/themes/custom/${PROJECT_NAME}
  rm -rf ${PROJECT_ROOT}/themes/custom/${PROJECT_NAME}/.git

fi

# ToDo. Fix access rights.

