FROM drupal:8-apache
MAINTAINER Jason Porter <jporter@redhat.com>

ARG http_proxy
ARG https_proxy

LABEL version="dev"

COPY run.sh /
COPY db-check.php /

# Adding the custom modules
COPY modules/custom/redhat_developers /var/www/html/modules/custom/redhat_developers
COPY modules/custom/layoutmanager /var/www/html/modules/custom/layoutmanager
COPY modules/custom/basewidget /var/www/html/modules/custom/basewidget
#COPY profiles/red_hat_developer /var/www/html/profiles/redhat_developer

# Adding the theme, we can override for development
COPY themes/custom/rhd /var/www/html/themes/custom/rhd

CMD ["/bin/bash", "/run.sh"]
