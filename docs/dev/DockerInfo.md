## docker commands

```sh
# build development image
docker build \
    --file Dockerfile.dev \
    --tag songbook:version \
    .

# create container & start & autodelete after use
docker run \
    --env-file ./server/.env \
    --name songbook \
    --rm \
    --publish 8080:8080
    songbook:version

# stop & remove container
docker stop songbook
docker rm songbook

# connect to a running container
docker exec -ti songbook bash

# prune
docker image prune
docker container prune
```

## images & containers

image = built application ready to be run

container = instance of image (process)

> you can stop and restart multiple containers from the same image

```sh

docker build [--tag <name:tag>] <path>
# builds script (including RUN instructions)

docker tag <source> <dest>
# creates a new tag

docker rmi <image>[:<tag>]
# remove image

docker run [options] <image-name>
# use CMD instruction
# ! creates a new container you can stop and restart !

# --- docker run options :

--publish (-p) <host-port>:<image-port>
docker run --publish 3000:8081 docker-node
# will run with internal port 8081 open as external port 3000

--detach (-d)
# detached mode (in the background)

# ---

docker ps [--all]
# list processes (running docker images)

docker stop (<container> | <id>)
# stops running container

docker restart (<container> | <id>)
# restarts stopped container

docker rm <container> [<container> ...]
# remove container (not image!)
```

### volumes
