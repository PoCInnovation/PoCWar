#!/bin/bash

shebang='#!/usr/bin/env node'
file='code.js'

if [ "$(head -c 2 $file)" != '#!' ]; then
    cat <(echo "$shebang") $file > bin.out
fi

chmod 755 bin.out

chmod 755 exec.sh

timeout 10s ./exec.sh