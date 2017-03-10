FROM ruby:2.1.10
MAINTAINER rblake@redhat.com, ihamilto@redhat.com
RUN groupadd -g 1000 testing
RUN useradd -g testing -m -s /bin/bash -u 1000 testing
USER testing
WORKDIR /home/testing

USER root
RUN mkdir /tmp/phantomjs \
    && curl -L https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 \
           | tar -xj --strip-components=1 -C /tmp/phantomjs \
    && mv /tmp/phantomjs/bin/phantomjs /usr/bin \
    && rm -rf /tmp/phantomjs

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install -j 10
