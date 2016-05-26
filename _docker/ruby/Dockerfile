FROM developer.redhat.com/base:2.0.0
MAINTAINER Jason Porter <jporter@redhat.com>

ARG http_proxy
ARG https_proxy

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
  wget

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

