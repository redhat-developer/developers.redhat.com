FROM ruby:2.1.10
MAINTAINER ihamilto@redhat.com

RUN apt-get update && apt-get install sudo
RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 && tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/ && sudo ln -sf /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin
RUN groupadd -g 1000 blinkr
RUN useradd -g blinkr -m -s /bin/bash -u 1000 blinkr
USER blinkr
WORKDIR /home/blinkr
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
COPY Gemfile Gemfile.lock ./
RUN bundle install -j 10
