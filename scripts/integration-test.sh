#!/bin/bash
unset retval

docker compose -f Test.docker-compose.yml up --build --abort-on-container-exit --exit-code-from todo-list
retval=$?
docker compose -f Test.docker-compose.yml down -v
exit $retval