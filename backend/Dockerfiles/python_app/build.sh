#!/bin/sh

shebang='#!/usr/bin/env python3'
file='code.py'

if [ "$(head -c 2 $file)" != '#!' ]; then
    echo $shebang > bin.out && cat $file >> bin.out
fi
