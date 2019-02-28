FROM registry.paas.redhat.com/rhdp/developer-base
USER root
ARG composer_profile="production"
CMD ["/var/www/drupal/run-httpd.sh"]
EXPOSE 8080
EXPOSE 8443
WORKDIR /var/www/drupal
RUN gem install asciidoctor -v 1.5.8

# Copy in database migration files
COPY drupal-filesystem/db-migrations /var/www/drupal/db-migrations

# Run composer to install Drupal and required dependencies
COPY drupal-filesystem/patches /var/www/drupal/patches
COPY drupal-filesystem/scripts/ScriptHandler.php /var/www/drupal/scripts/
COPY drupal-filesystem/composer.json drupal-filesystem/composer.lock /var/www/drupal/
RUN cd /var/www/drupal \
    && if [ "$composer_profile" = "development" ]; \
       then /usr/local/bin/composer install --no-interaction; \
       else /usr/local/bin/composer install --no-interaction --no-dev --optimize-autoloader; \
       fi

# Copy in the custom things we create
COPY drupal-filesystem/web/sites/default /var/www/drupal/web/sites/default
COPY drupal-filesystem/web/modules/custom /var/www/drupal/web/modules/custom
COPY drupal-filesystem/web/themes/custom /var/www/drupal/web/themes/custom

# Build the theme
RUN cd /var/www/drupal/web/themes/custom/rhdp/rhd-frontend \
    && npm install \
    && npm run-script build \
    && rm -rf /var/www/drupal/web/themes/custom/rhdp/rhd-frontend/node_modules

# Copy in the Drupal configuration
COPY drupal-filesystem/web/config/sync /var/www/drupal/web/config/sync

# Copy in static resources
COPY drupal-filesystem/static/ /var/www/drupal/web/

# Copy in Managed-Platform specific Configuration
COPY managed-platform/ /

# Permissions here are required for us to run on Managed Platform
RUN chown -R root:0 /opt/rh/httpd24/root/var/run/httpd \
    && chmod -R 770 /opt/rh/httpd24/root/var/run/httpd
RUN chgrp -R 0 /ansible \
    && chmod -R g=u /ansible

USER 1001
ENV PATH=$PATH:/var/www/drupal/vendor/bin