FROM centos:7.3.1611
RUN curl --silent --location https://rpm.nodesource.com/setup |bash -
RUN curl -O -L https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
    && yum -y install google-chrome-stable_current_x86_64.rpm

RUN yum install -y liberation-mono-fonts \
    liberation-narrow-fonts \
    liberation-sans-fonts \
    liberation-serif-fonts \
    ruby \
    nodejs \
    gcc-c++ \
    make

RUN gem install bundler
RUN groupadd -g 1000 unit \
    && useradd -g unit -m -s /bin/bash -u 1000 unit
USER unit
WORKDIR /home/unit
COPY package.json ./
RUN npm install
RUN gem install octokit
ENV PATH /home/unit/node_modules/.bin:$PATH