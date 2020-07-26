#!/bin/bash

shebang='#!/usr/bin/env ruby'
file='code.py'

if [ "$(head -c 2 $file)" != '#!' ]; then
    cat <(echo "$shebang") $file > bin.out
fi

chmod 755 bin.out
