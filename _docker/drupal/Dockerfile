FROM drupal:8
MAINTAINER Jason Porter <jporter@redhat.com>

LABEL version="dev"

RUN php -r "readfile('http://drupalconsole.com/installer');" > drupal.phar && mv drupal.phar /usr/local/bin/drupal && chmod +x /usr/local/bin/drupal

COPY run.sh /
COPY db-check.php /

# Adding the awestruct module
COPY redhat_developers /var/www/html/modules/custom/redhat_developers

CMD ["/bin/bash", "/run.sh"]
