FROM test-base:0.1.0

COPY Gemfile Gemfile.lock ./
RUN bundle install -j 10

RUN groupadd -g 1000 dcp
RUN useradd -g dcp -m -s /bin/bash -u 1000 dcp
USER dcp
WORKDIR /home/dcp
