#!/usr/bin/env bash

# Export variables
cd ${APP_ROOT}
export $(cat .env | grep -v \# | xargs)

# Install packages
composer install

# Sync composer packages.
cd ~
drush rsync -y vendor/ ${ACQUIA_ENV}:../vendor # ToDo. Clarify paths
drush rsync -y ${PROJECT_ROOT}/core ${ACQUIA_ENV}:/core
drush rsync -y ${PROJECT_ROOT}/libraries ${ACQUIA_ENV}:/libraries
drush rsync -y ${PROJECT_ROOT}/modules/contrib ${ACQUIA_ENV}:/modules/contrib
drush rsync -y ${PROJECT_ROOT}/profiles/contrib ${ACQUIA_ENV}:/profiles/contrib
drush rsync -y ${PROJECT_ROOT}/themes/contrib ${ACQUIA_ENV}:/themes/contrib

