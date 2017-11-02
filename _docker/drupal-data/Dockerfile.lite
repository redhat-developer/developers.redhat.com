FROM alpine:3.4
MAINTAINER rblake@redhat.com

# Make the directory structure that will be exposed as volumes by this data container
RUN mkdir -p /var/www/drupal/web/sites/default/files \
    /var/www/drupal/web/config/active \
    /docker-entrypoint-initdb.d

# Copy the database dump and drupal files
COPY work/drupal-db.sql.gz /docker-entrypoint-initdb.d
COPY work/config /var/www/drupal/web/config/active
COPY work/files /var/www/drupal/web/sites/default/files