FROM developer.redhat.com/base

RUN yum -y install subversion && \
    yum clean all

RUN svn export --trust-server-cert --force --non-interactive -q https://github.com/searchisko/searchisko/tags/v1.1.1/configuration /tmp/configuration

COPY run.sh /run.sh
CMD ["/bin/bash", "/run.sh"]
