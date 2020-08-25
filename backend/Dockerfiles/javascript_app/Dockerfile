FROM alpine:3.12.0

RUN apk add --no-cache node jq

WORKDIR /execution

COPY ./build.sh /tmp

CMD /tmp/build.sh
