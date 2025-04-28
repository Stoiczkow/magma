#!/bin/bash

docker network create magma;

docker-compose up -d; docker-compose logs -f;