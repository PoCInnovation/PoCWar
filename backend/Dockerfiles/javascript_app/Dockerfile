FROM node

RUN apk add --no-cache node

WORKDIR /execution

COPY ./build.sh /tmp

CMD /tmp/build.sh
