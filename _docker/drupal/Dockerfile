FROM developer.redhat.com/ruby:2.0.0
MAINTAINER Jason Porter <jporter@redhat.com>

ARG http_proxy
ARG https_proxy

LABEL version="dev"

ADD remi-release-6.rpm remi-release-6.rpm

RUN rpm -Uvh remi-release-6.rpm
RUN yum-config-manager --enable remi-php70; \
    yum -y update; \
    yum -y install \
           git \
           httpd.x86_64 \
           mysql \
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
           tar; \
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

RUN curl https://getcomposer.org/installer > composer-installer && php composer-installer && mv composer.phar /usr/local/bin/composer

ADD ./run-httpd.sh /run-httpd.sh
ADD ./drupal.conf /etc/httpd/conf.d/drupal.conf

RUN chmod -v +x /run-httpd.sh

WORKDIR /var/www/

# Align apache user and group id with jenkins_developer to solve any volume permission issues
RUN usermod -u 1000 apache
RUN groupmod -g 1000 apache

CMD ["/run-httpd.sh"]

