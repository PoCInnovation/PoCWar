FROM c_app

WORKDIR /execution

RUN apk add --no-cache g++

CMD g++ -W -Wall -Wextra -o bin.out code.cpp && ./exec.sh
