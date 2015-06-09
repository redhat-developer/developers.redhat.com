#!/bin/sh

for RECORD in "173.222.228.44 developers.redhat.com"; do
  grep -q "$RECORD" /private/etc/hosts || echo "$RECORD" | sudo tee -a /private/etc/hosts > /dev/null
done

