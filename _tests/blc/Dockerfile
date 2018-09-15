FROM centos:7.3.1611
MAINTAINER ihamilto@redhat.com

RUN yum install -y  epel-release gcc gcc-c++ git libcurl-devel libffi-devel libtool libxml2 libxml2-devel libxslt \
    libxslt-devel libyaml-devel openssl-devel patch readline-devel ruby-devel tar which wget make && yum clean all

WORKDIR /tmp
RUN wget http://cache.ruby-lang.org/pub/ruby/2.5/ruby-2.5.1.tar.gz \
    && tar -xzf /tmp/ruby-2.5.1.tar.gz \
    && cd ruby-2.5.1/ \
    && ./configure --disable-install-doc \
    && make \
    && make install \
    && rm -rf /tmp/*

RUN wget http://rubygems.org/rubygems/rubygems-2.6.13.tgz \
    && tar -zxf /tmp/rubygems-2.6.13.tgz \
    && cd /tmp/rubygems-2.6.13 \
    && ruby setup.rb \
    && rm -rf /tmp/* \
    && echo "gem: --no-ri --no-rdoc" > ~/.gemrc

RUN gem install bundler --version 1.15.4 --no-rdoc --no-ri
RUN gem install octokit -v 4.6.2 --no-rdoc --no-ri
