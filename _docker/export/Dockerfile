FROM developer.redhat.com/ruby:2.3.0

ARG http_proxy
ARG https_proxy

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN git clone --recursive https://github.com/redhat-developer/rhdp-httrack.git /httrack \
    && cd /httrack \
    && git checkout rhd-patch-for-export

RUN cd /httrack \
    && ./configure \
    && make -j8 \
    && make install DESTDIR=/

RUN groupadd -g 1000 jenkins_developer
RUN useradd -g jenkins_developer -m -s /bin/bash -u 1000 jenkins_developer
RUN mkdir -p mkdir /export && chown jenkins_developer:jenkins_developer /export
USER jenkins_developer
ENV GEM_HOME /home/jenkins_developer/gems
RUN mkdir -p /home/jenkins_developer/gems
RUN gem install nokogiri:1.5.10 \
    octokit:4.0 \
    typhoeus:0.8.0 \
    akamai-edgegrid:1.0.6
WORKDIR /home/jenkins_developer/developer.redhat.com
