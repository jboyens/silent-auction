#!/bin/bash -l

source /usr/local/bin/virtualenvwrapper.sh

workon silent-auction

# keep this around so we can cd back into the right place
# subshells aren't working with $!
OLD_PWD=`pwd`
cd ../silent-auction

case "$1" in
  "start")
    echo "STARTING..."
    eval "grunt serve &"
    PID=$!
    cd $OLD_PWD
    echo $PID > $OLD_PWD/grunt_serve.pid
    ;;
  "stop")
    echo "STOPPING..."
    cd $OLD_PWD
    kill -9 `cat grunt_serve.pid` && rm grunt_serve.pid
    ;;
  *)
    echo "Argument must be one of 'start' or 'stop'"
    exit 1
    ;;
esac

