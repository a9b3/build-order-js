FROM mhart/alpine-node

RUN npm install -g yarn

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

WORKDIR /app
RUN yarn --pure-lockfile
ADD . /app

RUN yarn run build

EXPOSE 8080
CMD yarn run serve
