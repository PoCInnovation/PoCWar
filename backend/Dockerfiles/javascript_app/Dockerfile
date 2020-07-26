FROM alpine:3.12.0

WORKDIR /execution

RUN apk add --no-cache jq nodejs-current --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community"

COPY ./build.sh /tmp

CMD /tmp/build.sh && ./exec.sh
