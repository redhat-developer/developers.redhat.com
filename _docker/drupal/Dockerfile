FROM drupal:8.0.0
MAINTAINER Jason Porter <jporter@redhat.com>

LABEL version="dev"

RUN curl -LSs http://drupalconsole.com/installer | php && mv console.phar /usr/local/bin/drupal

COPY run.sh /
COPY db-check.php /

# Adding the awestruct module
#COPY awestruct /var/www/html/modules/custom/awestruct

CMD ["/bin/bash", "/run.sh"]
