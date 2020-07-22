#!/bin/bash

g++ -W -Wall -Wextra -o bin.out code.cpp

chmod 755 exec.sh

timeout 10s ./exec.sh
