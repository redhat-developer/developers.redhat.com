FROM centos:7.3.1611
RUN curl --silent --location https://rpm.nodesource.com/setup |bash -
RUN curl -O -L https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
    && yum -y install google-chrome-stable_current_x86_64.rpm

RUN yum install -y liberation-mono-fonts liberation-narrow-fonts liberation-sans-fonts liberation-serif-fonts \
    epel-release gcc gcc-c++ git libcurl-devel libffi-devel libtool libxml2 libxml2-devel libxslt \
    libxslt-devel libyaml-devel openssl-devel patch readline-devel ruby-devel tar which wget nodejs

WORKDIR /tmp
RUN wget http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.2.tar.gz \
    && tar -xzf /tmp/ruby-2.1.2.tar.gz \
    && cd ruby-2.1.2/ \
    && ./configure --disable-install-doc \
    && make \
    && make install \
    && rm -rf /tmp/*

RUN wget http://production.cf.rubygems.org/rubygems/rubygems-2.4.1.tgz \
    && tar -zxf /tmp/rubygems-2.4.1.tgz \
    && cd /tmp/rubygems-2.4.1 \
    && ruby setup.rb \
    && rm -rf /tmp/* \
    && echo "gem: --no-ri --no-rdoc" > ~/.gemrc

RUN gem install bundler --no-rdoc --no-ri
RUN gem install octokit -v 4.6.2 --no-rdoc --no-ri

RUN groupadd -g 1000 unit \
    && useradd -g unit -m -s /bin/bash -u 1000 unit
USER unit
WORKDIR /home/unit
COPY package.json ./
RUN npm install
ENV PATH /home/unit/node_modules/.bin:$PATH
