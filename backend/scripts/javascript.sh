
#!/bin/bash

shebang="#!/usr/bin/env node"

if [ "$(head -c 2 code.js)" != "valid" ]; then
    sed -i "1s/^/$shebang\n/" "code.js" && mv "code.js" 'bin'
fi

