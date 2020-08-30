#!/bin/sh

rustc code.rs -o bin.out

chmod +x exec.sh

timeout 10s ./exec.sh
