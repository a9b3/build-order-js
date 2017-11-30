# Use latest versionc which comes with yarn
FROM mhart/alpine-node:9.2.0

WORKDIR /app

# Cache node_modules
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
RUN yarn --pure-lockfile

# Move source code
ADD . /app
# Build source code
RUN yarn run build

EXPOSE 8080
ENV APP_ENV "production"
CMD ["yarn", "run", "serve"]
