#!/bin/sh

gcc -W -Wall -Wextra -o bin.out code.c

timeout 10s ./exec.sh
