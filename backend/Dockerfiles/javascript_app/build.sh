#!/bin/sh

shebang='#!/usr/bin/env node'
file='code.js'

if [ "$(head -c 2 $file)" != '#!' ]; then
    echo $shebang > bin.out && cat $file >> bin.out
fi
