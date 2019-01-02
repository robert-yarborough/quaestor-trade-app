#!/usr/bin/env bash

# Export local environments variables.
# ToDO. Clarify path.
export $(cat .env | grep -v \# | xargs)

echo 'Init database backup before all changes.'
# TODO debug this command. Something goes wrong with db name.
drush @${ACQUIA_ENV} ac-database-instance-backup ${ACQUIA_DB_NAME}

echo 'Preview and import drupal configs.'
drush @${ACQUIA_ENV} config-import -y
drush @${ACQUIA_ENV} updatedb -y
drush @${ACQUIA_ENV} entity-updates -y
drush @${ACQUIA_ENV} cache-rebuild

# ToDo. debug this command. Something went wrong with Cleaning warnish cache.
echo 'Clear Varnish web cache for all Acquia Cloud domains.'
drush @${ACQUIA_ENV} ac-domain-list | sed -e 's/name   :  //g' | xargs -n1 drush @${ACQUIA_ENV} ac-domain-purge