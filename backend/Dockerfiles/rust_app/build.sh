#!/bin/bash

USER='user' cargo init

mv code.rs src/main.rs

cargo build --release

mv ./target/release/execution ./bin.out

chmod 755 exec.sh

timeout 10s ./exec.sh
