FROM drupal:8-apache
MAINTAINER Jason Porter <jporter@redhat.com>

LABEL version="dev"

RUN php -r "readfile('http://drupalconsole.com/installer');" > drupal.phar && mv drupal.phar /usr/local/bin/drupal && chmod +x /usr/local/bin/drupal

COPY run.sh /
COPY db-check.php /

# Adding the awestruct module
COPY redhat_developers /var/www/html/modules/custom/redhat_developers
COPY layoutmanager /var/www/html/modules/custom/layoutmanager
COPY basewidget /var/www/html/modules/custom/basewidget

VOLUME /var/www/html

CMD ["/bin/bash", "/run.sh"]
