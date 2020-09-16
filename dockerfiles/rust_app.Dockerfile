FROM c_app

RUN apk add --no-cache rust

CMD ./exec.sh