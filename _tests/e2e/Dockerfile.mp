#
# Dockerfile for running the end-to-end tests for the developer program in a CI environment
#
FROM images.paas.redhat.com/rhdp/developer-testing-base:e2e
MAINTAINER rblake@redhat.com
USER root
RUN useradd -g 0 -m -s /bin/bash -u 1000 e2e

WORKDIR /home/e2e
ENTRYPOINT ["/home/e2e/wait-for-selenium.sh"]

COPY package.json package-lock.json wait-for-selenium.sh ./
RUN chown -R e2e:root /home/e2e \
    && chmod -R 770 /home/e2e

USER e2e
RUN npm config set "registry" https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org/ \
    && npm config set strict-ssl=false \
    && npm install \
    && chmod -R g+w /home/e2e/node_modules

COPY tests tests

ENV PATH /home/e2e/node_modules/.bin:$PATH