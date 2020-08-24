FROM alpine:3.12.0

RUN apk add --no-cache gcc musl-dev jq

WORKDIR /execution

COPY ./build.sh /tmp

CMD /tmp/build.sh
