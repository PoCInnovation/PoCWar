FROM c_app

RUN apk add --no-cache go

CMD ./exec.sh