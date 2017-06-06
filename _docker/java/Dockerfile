FROM developer.redhat.com/base:2.0.0

ARG http_proxy
ARG https_proxy

# Install Java
RUN curl --junk-session-cookies --insecure --location --header "Cookie: oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.rpm" > /tmp/jdk-8-linux-x64.rpm && \
    yum -y install /tmp/jdk-8-linux-x64.rpm && \
    alternatives --install /usr/bin/java jar /usr/java/latest/bin/java 200000 && \
    alternatives --install /usr/bin/javaws javaws /usr/java/latest/bin/javaws 200000 && \
    alternatives --install /usr/bin/javac javac /usr/java/latest/bin/javac 200000
ENV JAVA_HOME /usr/java/latest

