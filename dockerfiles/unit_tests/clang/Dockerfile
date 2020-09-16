FROM gcc

COPY ./criterion.sh /
RUN /criterion.sh && rm /criterion.sh

WORKDIR /execution

COPY ./build.sh /

CMD /build.sh
