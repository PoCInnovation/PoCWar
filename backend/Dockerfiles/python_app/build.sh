#!/bin/bash

shebang='#!/usr/bin/env python3'
file='code.py'

if [ "$(head -c 2 $file)" != '#!' ]; then
    (echo "$shebang" && cat $file) > bin.out
fi

chmod +x bin.out

chmod +x exec.sh

timeout 10s ./exec.sh
