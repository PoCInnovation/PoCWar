FROM c_app

WORKDIR /execution

RUN apk add --no-cache rust

CMD rustc -o bin.out ./code && ./exec.sh
