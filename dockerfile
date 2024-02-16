FROM nginx:alpine

COPY ./dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

### UNCOMMENT and EDIT to ENABLE and INSTALL ssl-certificates
# RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
# RUN pip3 install pip --upgrade
# RUN pip3 install certbot-nginx
# RUN mkdir /etc/letsencrypt
# RUN certbot --nginx -d yourdomain.com -d www.yourdomain.com
# EXPOSE 443

EXPOSE 80
