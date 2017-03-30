FROM centos:7
MAINTAINER rblake@redhat.com, ihamilto@redhat.com

# Install the EPEL repository
RUN yum -y install \
  epel-release

# Install core RPMs
RUN yum -y install \
  tar \

# Install required developer tools
RUN yum -y install \
  make \
  gcc \

# Install node & npm and upgrade to desired versions.
RUN yum -y install \
  nodejs \
  npm

# Install ruby
RUN yum -y install ruby \
  ruby-devel \
  rubygems

COPY Gemfile .
COPY Gemfile.lock .

RUN gem install bundler && \
    bundle install -j 10

# Install broken-link-checker
RUN npm install broken-link-checker -g

RUN groupadd -g 1000 blchecking
RUN useradd -g blchecking -m -s /bin/bash -u 1000 blchecking
USER blchecking
WORKDIR /home/blchecking
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8