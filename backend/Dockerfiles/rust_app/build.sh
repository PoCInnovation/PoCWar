#!/bin/sh

rustc code.rs -o bin.out

chmod 755 exec.sh

timeout 10s ./exec.sh
