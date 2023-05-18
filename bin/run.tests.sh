#! /bin/bash
export MAILTRAP_USER=$1
export MAILTRAP_PASSWORD=$2
(
    cd tests/strapi &&
    yarn install &&
    yarn test
)