FROM centos:6 

RUN yum -y install yum-utils && yum clean all

RUN yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-base.repo
RUN yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-fastrack.repo
RUN yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-supplementary.repo
RUN yum-config-manager --add-repo http://yum.engineering.redhat.com/pub/yum/repo_files/rhel6-updates.repo

ADD RPM-GPG-KEY-redhat-release /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release

RUN yum -y upgrade && yum clean all
RUN yum -y install mysql-server && yum clean all

ADD my.cnf /etc/my.cnf
ADD init.sql /
RUN rm -rf ./var/lib/mysql/ib_logfile1 \
 && rm -rf ./var/lib/mysql/ib_logfile0 \
 && rm -rf ./var/lib/mysql/ibdata1

EXPOSE 3306

ADD run.sh /
RUN chmod +x /run.sh
CMD ["/run.sh"]
