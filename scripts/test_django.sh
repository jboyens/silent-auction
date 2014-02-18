#!/bin/bash -l

source /usr/local/bin/virtualenvwrapper.sh

workon silent-auction

# keep this around so we can cd back into the right place
# subshells aren't working with $!
OLD_PWD=`pwd`

cd ../silent-auction-backend

case "$1" in
  "start")
    echo "STARTING..."
    eval "./manage.py testserver --addrport 0.0.0.0:8999 --noinput initial &"
    PID=$!
    cd $OLD_PWD
    echo $PID > $OLD_PWD/django.pid
    ;;
  "stop")
    echo "STOPPING..."
    cd $OLD_PWD
    if [ -f django.pid ]
    then
      kill -9 `cat django.pid` && rm django.pid
    else
      echo "Can't kill anything... no django.pid"
    fi
    ;;
  *)
    echo "Argument must be one of 'start' or 'stop'"
    exit 1
    ;;
esac
