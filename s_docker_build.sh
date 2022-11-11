#!/usr/bin/env sh

# this script
# builds the docker image

docker build \
    --file Dockerfile.dev \
    --tag fireside:dev \
    .