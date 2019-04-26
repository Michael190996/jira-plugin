#!/usr/bin/env bash
echo Nginx start at $FRONT_HOST:$FRONT_PORT
export DOLLAR='$'
envsubst < /home_nginx/nginx.conf.template > /etc/nginx/nginx.conf # /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"