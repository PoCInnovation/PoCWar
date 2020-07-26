FROM alpine:3.12.0

WORKDIR /execution

RUN apk add --no-cache gcc musl-dev jq

CMD gcc -W -Wall -Wextra -o bin.out code.c && ./exec.sh
