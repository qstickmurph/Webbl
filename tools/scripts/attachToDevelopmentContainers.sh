#!/bin/bash

if [[ -n "$TMUX" ]]; then
  tmux new-window -n "Webbl dev containers"
else
  tmux new -s "Webbl"
  tmux rename-window "Webbl dev containers"
fi

tmux split-window -h -t :.1

tmux select-pane -t :.1 -T "webbl-web-dev docker logs"
tmux select-pane -t :.2 -T "webbl-api-dev docker logs"

tmux send-keys -t :.1 "docker logs -ft webbl-web-dev; exit" C-m
tmux send-keys -t :.2 "docker logs -ft webbl-api-dev; exit" C-m
