FROM alpine:3.12.0

WORKDIR /execution

RUN apk add --no-cache ruby ruby-bundler jq

COPY ./build.sh /tmp/build.sh

CMD /tmp/build.sh
