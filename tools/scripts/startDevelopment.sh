#!/bin/bash

cd $(git rev-parse --show-toplevel)

docker compose \
  --project-directory . \
  -f tools/containerfiles/compose.dev.yaml \
  --env-file ./tools/config/development.env \
  up --detach --build

cd -
