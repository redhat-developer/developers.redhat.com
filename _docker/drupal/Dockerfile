FROM centos:centos6
MAINTAINER Jason Porter <jporter@redhat.com>

# Get the latest
RUN yum -y update && yum -y install  \
  curl \ 
  curl-devel \
  httpd \
  mysql \
  php \
  php-gd \ 
  php-mbstring \ 
  php-mysql \
  php-pear \ 
  php-pdo \
  php-soap \ 
  php-xml \ 
  php-xmlrpc \ 
  tar \
&& yum clean all

RUN pear channel-discover pear.drush.org && pear install drush/drush
COPY run-httpd.sh /run-httpd.sh
COPY httpd.conf /etc/httpd/conf/httpd.conf
ADD awestruct_push-7.x-1.0-beta1.tar /var/www/html/sites/all/modules
EXPOSE 80

CMD ["/bin/bash", "/run-httpd.sh"]
