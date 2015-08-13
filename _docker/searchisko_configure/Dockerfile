FROM developer.redhat.com/base

RUN yum -y install git

#RUN git clone https://github.com/searchisko/configuration.git /tmp/configuration
RUN git clone https://github.com/ollyjshaw/configuration.git /tmp/configuration

WORKDIR /tmp/configuration

#RUN git checkout v1.1.1
RUN git checkout olly_fix

COPY run.sh /run.sh
CMD ["/bin/bash", "/run.sh"]
