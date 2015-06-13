#!/bin/bash
set -eo pipefail

Xvfb :99 -ac &
export DISPLAY=:99

make fe-test-int-all
