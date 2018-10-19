FROM developer.redhat.com/ruby:2.4.0

ARG http_proxy
ARG https_proxy

RUN { \
       echo '[mariadb]'; \
       echo 'name = MariaDB'; \
       echo 'baseurl = http://yum.mariadb.org/10.1/centos6-amd64'; \
       echo 'gpgkey=http://yum.mariadb.org/RPM-GPG-KEY-MariaDB'; \
       echo 'gpgcheck=1'; \
    } > /etc/yum.repos.d/MariaDB.repo

RUN yum install -y \
    MariaDB-client \
    && yum clean all \
    && rm -rf /var/cache/yum

RUN groupadd -g 1000 jenkins_developer
RUN useradd -g jenkins_developer -m -s /bin/bash -u 1000 jenkins_developer
USER jenkins_developer
RUN git lfs install \
    && git config --global user.email "rhd@redhat.com" \
    && git config --global user.name "Red Hat Developers Backup User"
WORKDIR /home/jenkins_developer