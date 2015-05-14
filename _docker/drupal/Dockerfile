FROM developer.redhat.com/base
MAINTAINER Jason Porter <jporter@redhat.com>

# Get the latest
RUN yum -y install  \
  curl-devel \
  httpd \
  mysql \
  # Install PHP
  php \
  php-gd \ 
  php-mbstring \ 
  php-mysql \
  php-pear \ 
  php-pdo \
  php-soap \ 
  php-xml \ 
  php-xmlrpc \
  # Install RVM dependencies
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
&& yum clean all

WORKDIR /var/www/html

# Install Ruby and bundler
RUN curl http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.2.tar.gz > /tmp/ruby-2.1.2.tar.gz \
    && cd /tmp \
    && tar -xzf /tmp/ruby-2.1.2.tar.gz \
    && cd ruby-2.1.2/ \
    && ./configure --disable-install-doc \
    && make \
    && make install \
    && rm -rf /tmp/*

RUN curl http://production.cf.rubygems.org/rubygems/rubygems-2.4.1.tgz > /tmp/rubygems-2.4.1.tgz \
    && cd /tmp \
    && tar -zxf /tmp/rubygems-2.4.1.tgz \
    && cd /tmp/rubygems-2.4.1 \
    && ruby setup.rb \
    && rm -rf /tmp/* \
    && echo "gem: --no-ri --no-rdoc" > ~/.gemrc

RUN gem install bundler --no-rdoc --no-ri

## Install the current gemset 
# Build the current gemset (user will only need to build the difference 
ADD Gemfile ./
ADD Gemfile.lock ./
RUN bundle install

RUN pear channel-discover pear.drush.org && pear install drush/drush
ADD awestruct_push-7.x-1.0-beta4.tar /var/www/html/sites/all/modules
COPY httpd.conf /etc/httpd/conf/httpd.conf
EXPOSE 80

# Add the site themes
VOLUME /var/www/html/sites/all/themes

# Add the script(s)
VOLUME /opt/drupal/bin

CMD ["/bin/bash", "/drupal/bin/run.sh"]
