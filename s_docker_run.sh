#!/usr/bin/env sh

# this script
# runs the docker image in a new container

docker run \
    --detach \
    --publish 8080:8080 \
    --name songbook_dev \
    songbook:dev


    #--env-file ./server/.env \