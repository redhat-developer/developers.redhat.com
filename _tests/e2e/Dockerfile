FROM images.paas.redhat.com/rhdp/developer-testing-base:e2e
USER root
RUN groupadd -g 1000 e2e \
    && useradd -g e2e -m -s /bin/bash -u 1000 e2e

RUN gem install bundler:1.16.1 octokit:4.6.2 --no-rdoc --no-ri

USER e2e
WORKDIR /home/e2e
COPY package.json package-lock.json ./
RUN npm config set "registry" https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org/ \
    && npm config set strict-ssl=false \
    && npm install

ENV PATH /home/e2e/node_modules/.bin:/usr/java/latest/bin:$PATH