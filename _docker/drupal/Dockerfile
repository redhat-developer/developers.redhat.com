FROM images.paas.redhat.com/rhdp/developer-base:rhel-76.3
MAINTAINER Jason Porter <jporter@redhat.com>

ARG http_proxy
ARG https_proxy
ARG composer_profile="production"

EXPOSE 8080

WORKDIR /var/www/drupal
RUN gem install asciidoctor -v 1.5.8
COPY apache/drupal.conf /opt/rh/httpd24/root/etc/httpd/conf.d/drupal.conf

# Run composer to install Drupal and required dependencies
COPY drupal-filesystem/scripts/ScriptHandler.php /var/www/drupal/scripts/
COPY drupal-filesystem/composer.json drupal-filesystem/composer.lock /var/www/drupal/
COPY drupal-filesystem/patches /var/www/drupal/patches

# Only install dev dependencies on dev environments
RUN if [ "$composer_profile" = "development" ]; \
    then /usr/local/bin/composer install --no-interaction; \
    else /usr/local/bin/composer install --no-interaction --no-dev --optimize-autoloader; \
    fi

ENV PATH=$PATH:/var/www/drupal/vendor/bin

# Set working directory and CMD
WORKDIR /var/www/drupal/web
CMD ["/var/www/drupal/run-httpd.sh"]

# Copy in static resources
COPY drupal-filesystem/static/ /var/www/drupal/web/

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

# Build the theme
RUN cd /var/www/drupal/web/themes/custom/rhdp/rhd-frontend \
    && npm install \
    && npm run-script build \
    && rm -rf /var/www/drupal/web/themes/custom/rhdp/rhd-frontend/node_modules

# Copy in the Drupal configuration
COPY drupal-filesystem/web/config/sync /var/www/drupal/web/config/sync