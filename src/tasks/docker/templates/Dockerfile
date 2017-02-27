<% if (dockerTarget === 'frontend') { %>
FROM ubuntu

MAINTAINER Sam L. <esayemm@gmail.com>

# Install programs
RUN apt-get update
RUN apt-get install -y nginx

##
# App Code

# IMPORTANT build app before calling docker build
##

WORKDIR /opt/app
ADD build /opt/app/build

# Move built website to nginx html folder
RUN rm -rf /var/www/html
RUN cp -r /opt/app/build /var/www/html

# Replace nginx server config
RUN rm -v /etc/nginx/sites-enabled/default
ADD nginx/default /etc/nginx/sites-enabled/default

# Don't run as daemon, keeps docker container alive
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80

CMD service nginx start
<% } else { %>
FROM mhart/alpine-node

WORKDIR /src
ADD . .

EXPOSE 8080
CMD npm run serve
<% } %>
