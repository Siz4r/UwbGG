#!/bin/bash

URL=http://localhost:8080
URL_SPLIT=(${URL//// })
sed -i "s,__PUBLIC_URL__,$URL,g" /usr/share/nginx/html/index.html
sed -i "s,./static/js,$URL/static/js,g" /usr/share/nginx/html/index.html
sed -i 's,+"static/js/"+,+"'${URL_SPLIT[2]}'/static/js/"+,g' /usr/share/nginx/html/index.html