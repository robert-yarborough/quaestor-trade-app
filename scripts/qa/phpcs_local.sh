#!/usr/bin/env bash

# Export local environments variables.
export $(cat .env | grep -v \# | xargs)

$(composer config --global home)/vendor/bin/phpcbf  --standard=Drupal --extensions=php,module,inc,install,test,theme,info  ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcbf  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcbf  --standard=Drupal --extensions=php,module,inc,install,test,theme,info --ignore=*.css,*.md,*/node_modules/* ${PROJECT_ROOT}/themes/custom
$(composer config --global home)/vendor/bin/phpcbf  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme --ignore=*.css,*.md,*/node_modules/* ${PROJECT_ROOT}/themes/custom

$(composer config --global home)/vendor/bin/phpcs  --standard=Drupal --extensions=php,module,inc,install,test,theme,info ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme ${PROJECT_ROOT}/modules/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=Drupal --extensions=php,module,inc,install,test,theme,info --ignore=*.css,*.md,*/node_modules/*  ${PROJECT_ROOT}/themes/custom
$(composer config --global home)/vendor/bin/phpcs  --standard=DrupalPractice --extensions=php,module,inc,install,test,theme --ignore=*.css,*.md,*/node_modules/* ${PROJECT_ROOT}/themes/custom