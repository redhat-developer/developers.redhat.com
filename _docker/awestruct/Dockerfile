FROM developer.redhat.com/base
MAINTAINER Jason Porter <jporter@redhat.com>

# install deps required by our build
RUN yum install -y  \
  bison \
  bzip2 \
  epel-release \
  gcc \
  gcc-c++ \
  git \
  libcurl-devel \
  libffi-devel \
  libtool \
  libxml2 \
  libxml2-devel \
  libxslt \
  libxslt-devel \
  libyaml-devel \
  openssl-devel \
  patch \
  readline-devel \
  ruby-devel \
  sqlite-devel \
  tar \
  which \
  wget \
&& yum clean all

# Prevent encoding errors
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN adduser --system --uid=1000 --home-dir /home/awestruct --shell /bin/bash -m -U awestruct

WORKDIR /tmp

# Install ruby and rubygems
RUN wget http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.2.tar.gz \
    && tar -xzf /tmp/ruby-2.1.2.tar.gz \
    && cd ruby-2.1.2/ \
    && ./configure --disable-install-doc \
    && make \
    && make install \
    && rm -rf /tmp/*

RUN wget http://production.cf.rubygems.org/rubygems/rubygems-2.4.1.tgz \
    && tar -zxf /tmp/rubygems-2.4.1.tgz \
    && cd /tmp/rubygems-2.4.1 \
    && ruby setup.rb \
    && rm -rf /tmp/* \
    && echo "gem: --no-ri --no-rdoc" > ~/.gemrc

RUN gem install bundler --no-rdoc --no-ri

USER awestruct

ENV GEM_HOME /home/awestruct/gems
RUN mkdir -p /home/awestruct/gems

WORKDIR /home/awestruct

## Build setup
# Build the current gemset (user will only need to build the difference
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
COPY gemrc /home/awestruct/.gemrc
RUN bundle install

WORKDIR /home/awestruct/developer.redhat.com

EXPOSE 4242

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]
CMD [ "rake", "git_setup bundle_update clean gen[docker]"]

