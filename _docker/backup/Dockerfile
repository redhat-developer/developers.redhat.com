FROM developer.redhat.com/ruby:2.0.0

ARG http_proxy
ARG https_proxy

COPY mariadb/MariaDB.repo /etc/yum.repos.d/MariaDB.repo

RUN curl -s https://setup.ius.io/ | bash
RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.rpm.sh | bash
RUN yum erase -y git \
    && yum install -y \
    git2u \
    git-lfs \
    MariaDB-client \
    && yum clean all
RUN groupadd -g 1000 jenkins_developer
RUN useradd -g jenkins_developer -m -s /bin/bash -u 1000 jenkins_developer
USER jenkins_developer
RUN git lfs install \
    && git config --global user.email "rhd@redhat.com" \
    && git config --global user.name "Red Hat Developers Backup User"
WORKDIR /home/jenkins_developer