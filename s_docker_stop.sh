#!/usr/bin/env sh

# stops and delete the docker container

docker stop fireside_dev
docker rm fireside_dev

# delete the docker image

docker rmi fireside:dev