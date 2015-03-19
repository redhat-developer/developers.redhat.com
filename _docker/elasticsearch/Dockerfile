FROM centos:6

ENV JAVA_VERSION 7u25
ENV BUILD_VERSION b15

# Upgrading system
RUN yum -y upgrade
RUN yum -y install wget which

# Downloading Java
RUN wget --no-cookies --no-check-certificate --header "Cookie: oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/$JAVA_VERSION-$BUILD_VERSION/jdk-$JAVA_VERSION-linux-x64.rpm" -O /tmp/jdk-8-linux-x64.rpm

#Install Java
RUN yum -y install /tmp/jdk-8-linux-x64.rpm
RUN alternatives --install /usr/bin/java jar /usr/java/latest/bin/java 200000
RUN alternatives --install /usr/bin/javaws javaws /usr/java/latest/bin/javaws 200000
RUN alternatives --install /usr/bin/javac javac /usr/java/latest/bin/javac 200000

ENV JAVA_HOME /usr/java/latest

#Install Elastic Search
ADD elasticsearch-0.90.5-1.noarch.rpm /
RUN export ELASTICSEARCH_POST_INSTALL_STARTUP=false && yum -y install /elasticsearch-0.90.5-1.noarch.rpm && rm /elasticsearch-0.90.5-1.noarch.rpm

ADD elasticsearch.yml /etc/elasticsearch/
RUN mkdir -p /services/elasticsearch/ && chmod 777 -R /services/elasticsearch/

EXPOSE 9200 9300

ADD run.sh /
RUN chmod +x /run.sh
CMD ["/run.sh"]
