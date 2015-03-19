FROM centos:6

ENV JAVA_VERSION 7u25
ENV BUILD_VERSION b15

# Upgrading system
RUN yum -y upgrade
RUN yum -y install wget which mysql tree

# Downloading Java
RUN wget --no-cookies --no-check-certificate --header "Cookie: oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/$JAVA_VERSION-$BUILD_VERSION/jdk-$JAVA_VERSION-linux-x64.rpm" -O /tmp/jdk-8-linux-x64.rpm

#Install Java
RUN yum -y install /tmp/jdk-8-linux-x64.rpm
RUN alternatives --install /usr/bin/java jar /usr/java/latest/bin/java 200000
RUN alternatives --install /usr/bin/javaws javaws /usr/java/latest/bin/javaws 200000
RUN alternatives --install /usr/bin/javac javac /usr/java/latest/bin/javac 200000

ENV JAVA_HOME /usr/java/latest

RUN yum -y install subversion
RUN svn export --trust-server-cert --force --non-interactive -q https://github.com/jboss-developer/www.jboss.org/trunk/_dcp /tmp/configuration
RUN svn export --trust-server-cert --force --non-interactive -q https://github.com/searchisko/searchisko/tags/v1.1.1/configuration /tmp/configuration

ADD run.sh /
RUN chmod +x /run.sh
CMD ["/run.sh"]

