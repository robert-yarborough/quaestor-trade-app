#!/usr/bin/env bash

# ToDo. Test in pipelines.
# Die on any error.
set -e

# Export local environments variables.
export $(cat .env | grep -v \# | xargs)

composer global require squizlabs/php_codesniffer="^2.8.1"
composer global require drupal/coder:^8.2.12
composer global require dealerdirect/phpcodesniffer-composer-installer

$(composer config --global home)/vendor/bin/phpcs  --standard=Drupal --extensions=php,module,inc,install,test,theme,info ./docroot/modules/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme ./docroot/modules/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=Drupal --extensions=php,module,inc,install,test,theme,info --ignore=*.css,*.md,*/node_modules/* ./docroot/themes/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme --ignore=*.css,*.md,*/node_modules/* ./docroot/themes/custom