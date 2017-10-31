# This is a data container so keep the image as small as possible
FROM alpine:3.4
MAINTAINER rblake@redhat.com

# Make the directory structure that will be exposed as volumes by this data container
RUN mkdir -p /var/www/drupal/web/sites/default/files \
    /var/www/drupal/web/config/active \
    /docker-entrypoint-initdb.d \
    /drupal-data

COPY drupal-db.sql.gz /docker-entrypoint-initdb.d
ADD drupal-filesystem.tar.gz /drupal-data
RUN rm -rf /drupal-data/files/css /drupal-data/files/js /drupal-data/files/php

RUN cp -r /drupal-data/config/lightning/* /var/www/drupal/web/config/active
RUN cp -r /drupal-data/files/* /var/www/drupal/web/sites/default/files
CMD true
