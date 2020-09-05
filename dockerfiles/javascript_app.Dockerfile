FROM alpine:3.12.0

RUN apk add --no-cache nodejs jq bash

WORKDIR /execution

CMD ./exec.sh