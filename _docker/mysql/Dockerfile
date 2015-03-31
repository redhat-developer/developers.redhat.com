FROM developer.redhat.com/base

RUN yum install -y mysql-server

# Add the MySQL config
ADD my.cnf /etc/my.cnf

# Delete the log and data files created by the instalation.
# These need to be removed as the new my.cnf may contain changes to their sizes.
# The MySQL service requires that they are removed if the size is changed.
RUN rm -rf ./var/lib/mysql/ib_logfile1 && \
    rm -rf ./var/lib/mysql/ib_logfile0 && \
    rm -rf ./var/lib/mysql/ibdata1

EXPOSE 3306

COPY run.sh /run.sh
CMD ["/bin/bash", "/run.sh"]
