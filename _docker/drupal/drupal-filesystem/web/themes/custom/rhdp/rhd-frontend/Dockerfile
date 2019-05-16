FROM images.paas.redhat.com/rhdp/developer-testing-base

RUN mkdir /testing
WORKDIR /testing
COPY . /testing

RUN npm install \
    && chmod -R 777 /testing

RUN gem install bundler:1.16.1 octokit:4.6.2 --no-rdoc --no-ri
USER 1001
