FROM developer.redhat.com/ruby
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
  php-xmlrpc


WORKDIR /tmp

## Install the current gemset 
# Build the current gemset (user will only need to build the difference 
ADD Gemfile ./
ADD Gemfile.lock ./
RUN bundle install -j 2

WORKDIR /var/www/html

RUN pear channel-discover pear.drush.org && pear install drush/drush
ADD awestruct_push-7.x-1.0-beta4.tar /var/www/html/sites/all/modules
COPY httpd.conf /etc/httpd/conf/httpd.conf
EXPOSE 80

# Add the site themes
VOLUME /var/www/html/sites/all/themes

# Add the script(s)
VOLUME /opt/drupal/bin

CMD ["/bin/bash", "/drupal/bin/run.sh"]
