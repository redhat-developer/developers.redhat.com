#!/bin/bash

## Commit back CDN changes
git add _cdn/cdn.yml
git commit -m "Update cdn.yml" || true
# Fetch any changes made since the build changed
git pull --rebase origin HEAD
git push origin HEAD

