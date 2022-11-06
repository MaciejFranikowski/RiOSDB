#! /bin/bash

set -x

#######################################################################################################################
# Install the mysql client to connect to mysql nodes
#######################################################################################################################
apt-get -qq update
apt-get -qq install mysql-client -y --no-install-recommends


#######################################################################################################################
# Import common functions
#######################################################################################################################
BASEDIR=$(dirname "$0")
source $BASEDIR/common_funs.sh

#######################################################################################################################
# Setup replication from master1 to slave1
#######################################################################################################################
setup_master_2_slave_replication $MASTER_1_HOST_IP $MASTER_1_ROOT_USER $MASTER_1_ROOT_PASSWORD $SLAVE_2_HOST_IP $SLAVE_2_ROOT_USER $SLAVE_2_ROOT_PASSWORD $REPL_USER2 $REPL_PASSWORD2
setup_master_2_slave_replication $MASTER_1_HOST_IP $MASTER_1_ROOT_USER $MASTER_1_ROOT_PASSWORD $SLAVE_1_HOST_IP $SLAVE_1_ROOT_USER $SLAVE_1_ROOT_PASSWORD $REPL_USER $REPL_PASSWORD