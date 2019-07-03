FROM images.paas.redhat.com/rhdp/developer-testing-base:unit

RUN mkdir /testing
WORKDIR /testing
COPY . /testing

RUN npm install \
    && chmod -R 777 /testing
USER 1001
