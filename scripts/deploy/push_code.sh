#!/usr/bin/env bash

echo 'Push changes to Acquia Cloud.'
git remote add acquia ${ACQUIA_GIT_URL}
git checkout ${ACQUIA_BRANCH}
git push acquia ${ACQUIA_BRANCH}
sleep 5s