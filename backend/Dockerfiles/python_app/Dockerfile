FROM alpine:3.12.0

RUN apk add --no-cache python3 jq

WORKDIR /execution

COPY ./build.sh /tmp

CMD /tmp/build.sh
