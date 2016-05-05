FROM centos:6


# Upgrading system and install commonly used packages
RUN yum clean dbcache && \
    yum -y upgrade && \
    yum -y install tree which unzip yum-utils && \
    yum clean all

# Add internal RHEL 6 repos
RUN yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-base.repo && \
    yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-fastrack.repo && \
    yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-supplementary.repo && \
    yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-updates.repo

RUN curl https://www.redhat.com/security/data/fd431d51.txt > /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release

