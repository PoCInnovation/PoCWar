FROM c_app

WORKDIR /execution

RUN apk add --no-cache go

CMD go build code.go -o bin.out && ./exec.sh
