FROM test-base:2.3.0

WORKDIR /tmp
RUN yum install -y bzip2 fontconfig freetype freetype-devel fontconfig-devel libstdc++ unzip && yum clean all && \
    wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
    mkdir -p /opt/phantomjs && \
    tar -xjvf /tmp/phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /opt/phantomjs/ && \
    cp /opt/phantomjs/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/bin/phantomjs && \
    rm -rf /tmp/phantomjs-2.1.1-linux-x86_64.tar.bz2

RUN curl --junk-session-cookies --insecure --location --header "Cookie: oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.rpm" > /tmp/jdk-8-linux-x64.rpm && \
    yum -y install /tmp/jdk-8-linux-x64.rpm && \
    alternatives --install /usr/bin/java jar /usr/java/latest/bin/java 200000 && \
    alternatives --install /usr/bin/javaws javaws /usr/java/latest/bin/javaws 200000 && \
    alternatives --install /usr/bin/javac javac /usr/java/latest/bin/javac 200000
ENV JAVA_HOME /usr/java/latest

RUN groupadd -g 1000 e2e \
    && useradd -g e2e -m -s /bin/bash -u 1000 e2e

USER e2e
WORKDIR /home/e2e
COPY package.json ./
COPY package-lock.json ./
RUN npm install
ENV PATH /home/e2e/node_modules/.bin:/usr/java/latest/bin:$PATH
