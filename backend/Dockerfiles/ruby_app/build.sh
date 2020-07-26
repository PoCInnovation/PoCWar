#!/bin/sh

shebang='#!/usr/bin/env ruby'
file='code.rb'

if [ "$(head -c 2 $file)" != '#!' ]; then
    echo $shebang > bin.out && cat $file > bin.out
fi
