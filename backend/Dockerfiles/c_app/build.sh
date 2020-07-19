#!/bin/bash

gcc -W -Wall -Wextra -o bin.out code.c

chmod 755 exec.sh

timeout 10s ./exec.sh
