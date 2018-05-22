FROM developer.redhat.com/ruby:2.3.0
MAINTAINER Jason Porter <jporter@redhat.com>

ARG http_proxy
ARG https_proxy

LABEL version="dev"

ADD remi-release-6.rpm /root/

# Install Node 8
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -

RUN rpm -Uvh /root/remi-release-6.rpm
RUN yum-config-manager --enable remi-php71; \
    yum -y update; \
    yum -y install \
           git \
           httpd.x86_64 \
           mysql \
           nodejs \
           php \
           php-cli \
           php-common \
           php-gd \
           php-pdo \
           php-mbstring \
           php-mysql \
           php-mysqlnd \
           php-opcache \
           php-xml \
           sendmail \
           tar \
           logrotate \
    yum clean all

RUN { \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=60'; \
		echo 'opcache.fast_shutdown=1'; \
		echo 'opcache.enable_cli=1'; \
	} > /etc/php.d/opcache-recommended.ini

EXPOSE 80

# Install latest composer
RUN curl https://getcomposer.org/installer > composer-installer && php composer-installer && mv composer.phar /usr/local/bin/composer 

WORKDIR /var/www/drupal
COPY apache/drupal.conf /etc/httpd/conf.d/drupal.conf
COPY logrotate/httpd /etc/logrotate.d/httpd

# Run composer to install Drupal and required dependencies
COPY drupal-filesystem/scripts/ScriptHandler.php /var/www/drupal/scripts/
COPY drupal-filesystem/composer.json drupal-filesystem/composer.lock drupal-filesystem/2663638-2.patch drupal-filesystem/view_render_patch.patch /var/www/drupal/
RUN /usr/local/bin/composer install -n
ENV PATH=$PATH:/var/www/drupal/vendor/bin

# Set working directory and CMD
WORKDIR /var/www/drupal/web
CMD ["/var/www/drupal/run-httpd.sh"]

# Copy in scripts for start-up
COPY drupal-filesystem/scripts/drupal_install_checker.rb drupal-filesystem/scripts/run-httpd.sh drupal-filesystem/scripts/phinx.rb /var/www/drupal/
RUN chmod -v +x /var/www/drupal/run-httpd.sh

# Copy in the custom things we create
COPY drupal-filesystem/web/sites/default /var/www/drupal/web/sites/default
COPY drupal-filesystem/web/modules/custom /var/www/drupal/web/modules/custom
COPY drupal-filesystem/web/themes/custom /var/www/drupal/web/themes/custom

# Copy in database migration files
COPY drupal-filesystem/phinx.yml /var/www/drupal/phinx.yml
COPY drupal-filesystem/db-migrations /var/www/drupal/db-migrations

# Copy in the Drupal configuration
COPY drupal-filesystem/web/config/sync /var/www/drupal/web/config/sync
RUN gem install asciidoctor
