#!/bin/bash
docker stop $(docker ps -a -q -n 2)
docker rm $(docker ps -a -q -n 2)
docker rmi -f $(docker images -a -q)
