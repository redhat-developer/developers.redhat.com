FROM developer.redhat.com/base

RUN yum -y install git

RUN git clone https://github.com/searchisko/configuration.git /tmp/configuration

WORKDIR /tmp/configuration

RUN git checkout v2.1.2

COPY run.sh /run.sh
CMD ["/bin/bash", "/run.sh"]
