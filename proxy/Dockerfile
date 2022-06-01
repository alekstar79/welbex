FROM ubuntu:20.04

RUN apt update -y
RUN apt -y install curl nginx

RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

VOLUME ["/etc/nginx/sites-enabled", "/var/log/nginx"]

RUN rm /etc/nginx/sites-available/default; exit 0
COPY ./nginx.conf /etc/nginx/sites-available/default
COPY ./includes/ /etc/nginx/includes/

WORKDIR /etc/nginx

EXPOSE 80

CMD ["nginx"]
