#!/bin/sh

go build code.go -o bin.out

chmod 755 exec.sh

timeout 10s ./exec.sh
