FROM developer.redhat.com/ruby
MAINTAINER Jason Porter <jporter@redhat.com>

# Prevent encoding errors
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

COPY mariadb/MariaDB.repo /etc/yum.repos.d/MariaDB.repo

RUN yum install -y  \
  pngquant \
  MariaDB-client

RUN wget http://prdownloads.sourceforge.net/optipng/optipng-0.7.5.tar.gz?download && \
  mv optipng* optipng.tar.gz && \
  tar -xvzf optipng.tar.gz

WORKDIR /tmp/optipng-0.7.5
RUN ./configure && make && make install

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
