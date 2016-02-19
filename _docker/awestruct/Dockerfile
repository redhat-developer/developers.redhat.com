FROM developer.redhat.com/ruby23
MAINTAINER Jason Porter <jporter@redhat.com>

# Prevent encoding errors
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN yum install -y  \
  pngquant

RUN wget http://prdownloads.sourceforge.net/optipng/optipng-0.7.5.tar.gz?download && \
  mv optipng* optipng.tar.gz && \
  tar -xvzf optipng.tar.gz

WORKDIR /tmp/optipng-0.7.5
RUN ./configure && make && make install

WORKDIR /tmp
RUN yum install -y fontconfig freetype && \
    wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2 && \
    mkdir -p /opt/phantomjs && \
    tar -xjvf /tmp/phantomjs-1.9.8-linux-x86_64.tar.bz2 -C /opt/phantomjs/ && \
    cp /opt/phantomjs/phantomjs-1.9.8-linux-x86_64/bin/phantomjs /usr/bin/phantomjs

RUN adduser --system --uid=1000 --home-dir /home/awestruct --shell /bin/bash -m -U awestruct

USER awestruct

ENV GEM_HOME /home/awestruct/gems
RUN mkdir -p /home/awestruct/gems

WORKDIR /home/awestruct

## Build setup
# Build the current gemset (user will only need to build the difference
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
COPY gemrc /home/awestruct/.gemrc

#parallel install of gems
RUN bundle install -j 10

WORKDIR /home/awestruct/developer.redhat.com

EXPOSE 4242

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]
CMD [ "rake", "git_setup clean gen[docker]"]
