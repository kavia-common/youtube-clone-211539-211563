#!/bin/bash
cd /home/kavia/workspace/code-generation/youtube-clone-211539-211563/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

