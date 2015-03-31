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
  tar \
  bzip2 \
  gcc \
  ruby-devel \
  libxml2 \
  libxml2-devel \
  libxslt \
  libxslt-devel \
  libcurl-devel \
&& yum clean all

WORKDIR /var/www/html

# Add RVM keys
RUN gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3

# Install RVM
RUN curl -L get.rvm.io | bash -s stable
RUN /bin/bash -l -c "rvm requirements && rvm autolibs enable"

# Install Ruby
ADD .ruby-version ./
ADD .ruby-gemset ./
RUN /bin/bash -l -c "rvm install `cat .ruby-version`"

## Install the current gemset 
# Build the current gemset (user will only need to build the difference 
ADD Gemfile ./
ADD Gemfile.lock ./
RUN /bin/bash -l -c "bundle install"

RUN pear channel-discover pear.drush.org && pear install drush/drush
ADD awestruct_push-7.x-1.0-beta2.tar /var/www/html/sites/all/modules
COPY httpd.conf /etc/httpd/conf/httpd.conf
EXPOSE 80

# Add the site themes
VOLUME /var/www/html/sites/all/themes

# Add the script(s)
VOLUME /opt/drupal/bin

CMD ["/bin/bash", "/opt/drupal/bin/run.sh"]
