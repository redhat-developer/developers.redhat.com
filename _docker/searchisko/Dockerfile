FROM developer.redhat.com/java:2.0.0

RUN yum -y install mysql && \
    yum clean all

# Install JBoss EAP
RUN curl http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-jboss-eap-6-from-rhn.repo > /etc/yum.repos.d/rhel6-jboss-eap-6-from-rhn.repo && \
    yum install jbossas-standalone -y

# Install Searchisko
RUN curl http://download.eng.bos.redhat.com/brewroot/packages/org.searchisko-parent/2.1.5/1/noarch/searchisko-api-2.1.5-1.el6.noarch.rpm -Lo /searchisko.rpm && \
    yum -y install /searchisko.rpm && \
    rm /searchisko.rpm

ADD ./overlay /
ADD searchisko_es_data.tar.gz /

EXPOSE 8080 8080

COPY run.sh /run.sh
CMD ["/bin/bash", "/run.sh"]
