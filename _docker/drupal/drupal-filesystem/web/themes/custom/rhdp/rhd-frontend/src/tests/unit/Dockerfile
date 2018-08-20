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
COPY _docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend ./rhd-frontend
WORKDIR /home/unit/rhd-frontend
RUN npm install && npm run build
ENV PATH /home/unit/node_modules/.bin:$PATH
