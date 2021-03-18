#! /bin/bash
TAG=$1
(
    cd package &&
    npm login &&
    npm publish
)