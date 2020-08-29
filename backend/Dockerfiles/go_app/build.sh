#!/bin/sh

go build code.go -o bin.out

chmod +x exec.sh

timeout 10s ./exec.sh
