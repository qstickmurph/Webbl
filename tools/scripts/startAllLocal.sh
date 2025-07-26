PROJECT_ROOT=$(git rev-parse --show-toplevel)

if [ -z "${TMUX}" ]; then
    tmux new-session $PROJECT_ROOT/tools/scripts/startFrontend.sh \; \
        split-window $PROJECT_ROOT/tools/scripts/startBackend.sh
else
    echo "Please do not run this inside of a tmux session"
fi
