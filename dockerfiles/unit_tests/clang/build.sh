#!/bin/bash

timeout=12 # in seconds

gcc -o bin.out /code.c -lcriterion

./bin.out --fail-fast --timeout $timeout -Ojson:/extension/output.json
