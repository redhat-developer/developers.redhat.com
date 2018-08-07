FROM test-base:2.3.0

RUN curl -O -L https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
    && yum -y install google-chrome-stable_current_x86_64.rpm \
       liberation-mono-fonts \
       liberation-narrow-fonts \
       liberation-sans-fonts \
       liberation-serif-fonts

RUN groupadd -g 1000 unit \
    && useradd -g unit -m -s /bin/bash -u 1000 unit
USER unit
WORKDIR /home/unit
COPY package.json ./
RUN npm install
WORKDIR /home/unit/developers.redhat.com/_docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend/
RUN npm install
RUN npm start
WORKDIR /home/unit
ENV PATH /home/unit/node_modules/.bin:$PATH
