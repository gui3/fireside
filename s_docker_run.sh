#!/usr/bin/env sh

# this script
# runs the docker image in a new container

cd $(dirname "$0") # goto this file directory

cd ../..
docker run \
    --detach \
    --env-file ./server/.env \
    --publish 8080:8080 \
    --name songbook_dev \
    songbook:dev