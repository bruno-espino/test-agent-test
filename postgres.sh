#!/bin/bash

docker run \
   --rm \
   -p 5432:5432 \
   -v $(pwd)/.sst/storage/postgres:/var/lib/postgresql/data \
   -e POSTGRES_USER=postgres \
   -e POSTGRES_PASSWORD=password \
   -e POSTGRES_DB=local \
   postgres:17.4
