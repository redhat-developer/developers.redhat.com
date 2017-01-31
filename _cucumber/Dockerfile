FROM ruby:2.1.10
MAINTAINER rblake@redhat.com, ihamilto@redhat.com
RUN groupadd -g 1000 testing
RUN useradd -g testing -m -s /bin/bash -u 1000 testing
USER testing
WORKDIR /home/testing
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install -j 10