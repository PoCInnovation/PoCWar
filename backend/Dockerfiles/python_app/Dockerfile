FROM alpine:3.12.0

WORKDIR /execution

RUN apk add --no-cache python3 jq

COPY ./build.sh /tmp

CMD /tmp/build.sh && ./exec.sh
