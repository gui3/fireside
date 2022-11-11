#!/usr/bin/env sh

# this script
# runs the docker image in a new container

docker run \
    --detach \
    --publish 8080:8080 \
    --name fireside_dev \
    fireside:dev


    #--env-file ./server/.env \