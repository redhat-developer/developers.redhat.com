FROM jruby:9.1-onbuild
MAINTAINER ihamilto@redhat.com
RUN apt-get update
RUN apt-get install sudo

# FOR Java::JavaLang::OutOfMemoryError: Java heap space ERROR.
ENV JRUBY_OPTS="-J-Xmx3g  -Xms3g -XX:+CMSClassUnloadingEnabled -XX:+UseConcMarkSweepGC"

RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
RUN tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
RUN sudo ln -sf /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin
RUN phantomjs --version

RUN groupadd -g 1000 blinkr
RUN useradd -g blinkr -m -s /bin/bash -u 1000 blinkr
USER blinkr
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
WORKDIR /home/blinkr
