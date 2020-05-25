## Installing latest node on docker image

- Refer https://gist.github.com/remarkablemark/aacf14c29b3f01d6900d13137b21db3a
  ```
  FROM ubuntu:latest

  RUN set -eux \
      && apt-get update \
      && apt-get install -y curl \
      && apt-get -y autoclean \
      && rm -rf /var/lib/apt/lists/*

  ENV NVM_VERSION v0.34.0
  ENV NODE_VERSION v13.7.0
  ENV NVM_DIR /usr/local/nvm
  RUN mkdir $NVM_DIR
  RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

  ENV NODE_PATH $NVM_DIR/$NODE_VERSION/lib/node_modules
  ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

  RUN echo "source $NVM_DIR/nvm.sh && \
      nvm install $NODE_VERSION && \
      nvm alias default $NODE_VERSION && \
      nvm use default" | bash

  CMD ["bash"]
  ```

- Build the custom image
```
$ docker build -t node-img:latest
```

### Running cypress from custom built docker image
```
// use npm install with Cypress cache volume specified, instead of npm ci if you don't want caching and remove specifying volume for Cypress cache
$ docker run --volume `pwd`:/app --volume /Users/punith.k/Library/Caches/Cypress/4.0.2:/root/.cache/Cypress/4.0.2 --workdir /app node-img:latest bash -c "npm install && npm run test:cypress"

// working command
& docker run --volume `pwd`:/app --workdir /app node-img:latest bash -c "npm ci && npm run test:cypress"
```


### Node image with least permissions

```
FROM node:12-slim
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app

WORKDIR /app
USER node

COPY --chown=node:node package.json package-lock*.json ./
RUN npm install && npm cache clean --force

COPY --chown=node:node . .
CMD ['node', 'start']
```

- Accessing the file system for node image is not allowed

- Give the root permissions, as follows,
```
$ docker-compose exec -u root node bash
```
