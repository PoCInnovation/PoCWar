#!/bin/sh

g++ -W -Wall -Wextra -o bin.out code.cpp

chmod +x exec.sh

timeout 10s ./exec.sh
