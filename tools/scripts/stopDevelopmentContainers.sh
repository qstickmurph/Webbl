#!/bin/bash

cd $(git rev-parse --show-toplevel)

docker compose \
  --project-directory . \
  -f tools/compose/compose.dev.yaml \
  --env-file ./tools/config/development.env \
  down

cd -
