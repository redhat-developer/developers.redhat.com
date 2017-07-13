FROM centos:7.3.1611
RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
RUN curl -O -L https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
    && yum -y install google-chrome-stable_current_x86_64.rpm
RUN curl --junk-session-cookies --insecure --location --header "Cookie: oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.rpm" > /tmp/jdk-8-linux-x64.rpm && \
    yum -y install /tmp/jdk-8-linux-x64.rpm && \
    alternatives --install /usr/bin/java jar /usr/java/latest/bin/java 200000 && \
    alternatives --install /usr/bin/javaws javaws /usr/java/latest/bin/javaws 200000 && \
    alternatives --install /usr/bin/javac javac /usr/java/latest/bin/javac 200000
ENV JAVA_HOME /usr/java/latest

RUN yum install -y liberation-mono-fonts \
    liberation-narrow-fonts \
    liberation-sans-fonts \
    liberation-serif-fonts \
    ruby \
    nodejs \
    gcc-c++ \
    make

RUN gem install bundler
RUN groupadd -g 1000 e2e \
    && useradd -g e2e -m -s /bin/bash -u 1000 e2e
USER e2e
WORKDIR /home/e2e
COPY package.json ./
RUN npm install
RUN gem install octokit
ENV PATH /home/e2e/node_modules/.bin:$PATH
