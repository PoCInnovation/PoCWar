FROM alpine:3.12.0

RUN apk add --no-cache gcc musl-dev jq

WORKDIR /execution

COPY ./build.sh /tmp

RUN chmod +x /tmp/build.sh

CMD /tmp/build.sh
