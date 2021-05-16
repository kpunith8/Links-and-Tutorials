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

// Mounting currenct directory in windows, -v %cd%:/app or in Linux $(pwd):/app

// working command
$ docker run --volume `pwd`:/app --workdir /app node-img:latest bash -c "npm ci && npm run test:cypress"
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

## Simple Express App

```dockerfile
FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]
```

- Build the image
```
$ docker build -t node-express-image .
```

- Run the container
```
$ docker run -v `pwd`:/app -p 3000:3000 -d --name node-express-app node-express-image
```

- Make the volume read-only so that container can't make changes to the local file system
```
$ docker run -v `pwd`:/app:ro -p 3000:3000 -d --name node-express-app node-express-image
```

- Set environment variables while running the container
```
$ docker run -v `pwd`:/app:ro --env PORT=4000 -p 3000:4000 -d --name node-express-app node-express-image
```

- Verify that the environment variables are set by printing them in interactive mode
```
$ docker exec -it node-express-app bash
root@123:/app# printenv
```

> NOTE: PORT should be declared in Dockerfile to make use of the environment variables
```dockerfile
ENV PORT 3000
EXPOSE $PORT
```

- Pass multiple environment variables from a file
```
$ docker run -v `pwd`:/app:ro --env-file ./.env -p 3000:4000 -d --name node-express-app node-express-image
```
> Make sure to create .env in the root directory where the Dockerfile is present

- Run commands on running container
```
$ docker exec -it node-express-app bash
// Which opens bash shell for the the image created, where you can run the linux commands
```

- Check the log of the image for any errors
```
$ docker logs node-express-app
```

- Delete the volumes associated with a running container, if you want to persist database like mysql, mongoDB don't delete the voulmes
```
$ docker rm node-express-app -fv
// or
$ docker volume prune
```

## Docker compose

- To run multiple containers in one go reduce boilerplate commands to run while developing

- Create a file called, `docker-compose.yml`
```yml
version: "3"
services:
  node-express-app: # Name of the container
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./:/app:ro
      - /app/node_modules
    environment:
      - PORT=3000
    # env-file: # To pass environment variables from a file
    #   - ./.env 
```

- Start the service defined in docker-compose file, `-d option` to run the container in detatch mode
```
$ docker-compose up -d
```

- Stop the service started using docker-compose, `-v option` to delete the volumes attached, only if they are not
required.
```
$ docker-compose down -v
```

- Making changes to Dockerfile and running the service again doesn't create the new image with updated changes,
pass `--build` option to `docker-compose up -d --build` to create the new image with chanegs and start the container.

## Docker compose to build images based on dev/prod environment

- Create `docker-compose.dev.yml` file for development environment and `docker-compose.prod.yml` file production
and a `docker-compose.yml` which contains the shareable configuration between the environments

`docker-compose.yml`
```yml
version: "3"
services:
  node-express-app: # Name of the container
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
```

`docker-compose.dev.yml`
```yml
version: "3"
services:
  node-express-app:
    volumes:
      - ./:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

`docker-compose.prod.yml`
```yml
version: "3"
services:
  node-express-app:
    environment:
      - NODE_ENV=production
    command: node index.js
```

- Now start the services based on the environment, `-f option` to mention the file name, order of the file name should be mentioned properly
```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

## Create mongo service

- Connect to mongo inside the container
```
$ docker exec -it <container-id> bash
$ mongo -u "root" -p "root"
```

> Username and passwords are passed into docker-compose.yml file
```yml
services:
  mongo:
    image: mongo
    environment: 
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=root
    volumes:
      - mongo-db:/data/db

# This is make sure mongo-db named volume works without any errors
volumes: 
  mongo-db:
```

- Use named volumes to persist the data for mongoDB

## Connect to the DB running in the container

- Inspect the running container to get the IP address of the mongo container
```
$ docker inspect <container-id>
```

- Connect to the DB in source code
```js
const mongoose = require('mongoose')

mongoose
  .connect("mongodb://root:root@172.24.0.2:27017/?authSource=admin")
  .then(() => console.log("DB connection successful!!"))
  .catch((err) => console.log("Error connecting to DB", err));
```

- Then check the logs of the node container to verify that the DB connection is successful. `-f option` to follow the logs while container is running
```
$ docker logs <container-id> -f
```

- Instead of using the IP address of the container to connect to DB (which will change every time we stop and re build the container), updating everytime the IP address is not a recommended way to connect to the DB. Use the network created by docker to establish the connection dynamically

- List all the networks created by docker
```
$ docker network ls
```

```js
// Here, mongo is the service name specified in the docker-compose.yml file
// as s service name
mongoose
  .connect("mongodb://root:root@mongo:27017/?authSource=admin")
  .then(() => console.log("DB connection successful!!"))
  .catch((err) => console.log("Error connecting to DB", err));
```