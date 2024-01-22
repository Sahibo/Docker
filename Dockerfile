FROM nginx 

WORKDIR /usr/share/nginx/html

COPY front/ .

CMD [ "nginx", "-g", "daemon off;"]