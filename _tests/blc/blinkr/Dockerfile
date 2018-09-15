FROM test-base:0.1.0

WORKDIR /tmp
COPY Gemfile Gemfile.lock ./
RUN bundle install -j 10

RUN groupadd -g 1000 blinkr
RUN useradd -g blinkr -m -s /bin/bash -u 1000 blinkr
USER blinkr
WORKDIR /home/blinkr
