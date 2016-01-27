FROM developer.redhat.com/java


#Install Elastic Search
ADD elasticsearch-0.90.5-1.noarch.rpm /
ADD elasticsearch.yml /etc/elasticsearch/
RUN export ELASTICSEARCH_POST_INSTALL_STARTUP=false && \
    yum -y install /elasticsearch-0.90.5-1.noarch.rpm && \
    rm /elasticsearch-0.90.5-1.noarch.rpm && \
    mkdir -p /services/elasticsearch/ && \
    chmod 777 -R /services/elasticsearch/

EXPOSE 9200 9300

COPY run.sh /
CMD ["/bin/bash", "/run.sh"]
