FROM drupal:8.0.0
MAINTAINER Jason Porter <jporter@redhat.com>

LABEL version="dev"

RUN curl -LSs http://drupalconsole.com/installer | php && mv console.phar /usr/local/bin/drupal

COPY run.sh /
COPY db-check.php /

# Adding the awestruct module
ADD awestruct-8.x-1.0-dev.tar.gz /var/www/html/modules/custom

CMD ["/bin/bash", "/run.sh"]
