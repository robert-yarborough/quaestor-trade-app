#!/usr/bin/env bash

# Export local environments variables.
export $(cat .env | grep -v \# | xargs)

composer global require squizlabs/php_codesniffer="^2.8.1"
composer global require drupal/coder:^8.2.12
composer global require dealerdirect/phpcodesniffer-composer-installer

$(composer config --global home)/vendor/bin/phpcbf  --standard=Drupal --extensions=php,module,inc,install,test,theme,info  ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcbf  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcbf  --standard=Drupal --extensions=php,module,inc,install,test,theme,info --ignore=*.css,*.md ${PROJECT_ROOT}/themes/custom
$(composer config --global home)/vendor/bin/phpcbf  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme --ignore=*.css,*.md ${PROJECT_ROOT}/themes/custom

$(composer config --global home)/vendor/bin/phpcs  --standard=Drupal --extensions=php,module,inc,install,test,theme,info ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=Drupal --extensions=php,module,inc,install,test,theme,info --ignore=*.css,*.md  ${PROJECT_ROOT}/themes/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme --ignore=*.css,*.md ${PROJECT_ROOT}/themes/custom