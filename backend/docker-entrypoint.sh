#!/bin/bash
echo "Adding hosts GID to docker system group"

DOCKER_SOCKET=/var/run/docker.sock
DOCKER_GROUP=docker

if [ -S ${DOCKER_SOCKET} ]; then
    DOCKER_GID=$(stat -c '%g' ${DOCKER_SOCKET})

    groupmod -g ${DOCKER_GID} ${DOCKER_GROUP}
    usermod -aG ${DOCKER_GROUP} node
    getent group | grep docker
fi

if [ ${NODE_ENV} == "development" ]; then
    SCRIPT_TO_RUN=start:dev
else
    SCRIPT_TO_RUN=start
fi

exec /usr/sbin/gosu node bash -c "npm run ${SCRIPT_TO_RUN}"