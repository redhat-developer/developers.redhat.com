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

RUN wget -O /etc/yum.repos.d/rhel6-jboss-eap-6-from-rhn.repo  http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-jboss-eap-6-from-rhn.repo
RUN wget -O /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release https://www.redhat.com/security/fd431d51.txt
RUN yum install jbossas-standalone -y

RUN wget http://download.devel.redhat.com/brewroot/packages/org.searchisko-parent/1.1.1/1/noarch/searchisko-api-1.1.1-1.el6.noarch.rpm
RUN yum -y install /searchisko-api-1.1.1-1.el6.noarch.rpm

RUN yum -y install subversion 
RUN svn export --trust-server-cert --force --non-interactive -q https://github.com/jboss-developer/www.jboss.org/trunk/_dcp /tmp/configuration
RUN svn export --trust-server-cert --force --non-interactive -q https://github.com/searchisko/searchisko/tags/v1.1.1/configuration /tmp/configuration

RUN yum install -y mysql unzip

ADD ./overlay /

RUN unzip /searchisko.sql.zip

EXPOSE 8080 8080

ADD run.sh /
RUN chmod +x /run.sh
CMD ["/run.sh"]

