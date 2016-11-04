FROM mhart/alpine-node

WORKDIR /src
ADD . .

RUN npm install -g forever

EXPOSE 8080
CMD forever index.js
