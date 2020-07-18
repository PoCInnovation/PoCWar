#!/bin/bash

shebang="#!/usr/bin/env python3"

if [ "$(head -c 2 code.py)" != "valid" ]; then
    sed -i "1s/^/$shebang\n/" "code.py" && mv "code.py" 'bin'
fi
