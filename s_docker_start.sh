#!/usr/bin/env sh


# builds the docker image

docker build \
    --file Dockerfile.dev \
    --tag fireside:dev \
    .

# runs the docker image in a new container

docker run \
    --detach \
    --publish 8080:8080 \
    --name fireside_dev \
    fireside:dev


    #--env-file ./server/.env \