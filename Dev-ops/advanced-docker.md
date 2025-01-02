# Installing latest node on docker image

- Refer https://gist.github.com/remarkablemark/aacf14c29b3f01d6900d13137b21db3a
```dockerfile
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

### Node image with least permissions (security)

```dockerfile
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

### Node docker for secure and optimized containers

```dockerfile
FROM node:alpine-19.6

WORKDIR /usr/src/app 

ENV NODE_ENV production

# Copy the package.json and package-lock.json files first and then install the packages,
# copying the /src folder first would invalidate layers cached by docker previously as we might have
# changes in the /src folder 
COPY package*.json ./

# use `ci` clean install option instead of `install` as it installs the exact version each time and maintains
# the consistency and use --only=production to install only dependencies and it doesn't install dev dependencies
# as they are not required to run in production

# Using the mount type cache is a buildkit feature, it should enabled and set DOCKER_BUILDKIT=1
# This installs the packages to .npm cache folder on subsequent installs it checks the cache and 
# installs if it is not found in the cache. This improves the build speed.
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \ 
    npm ci --only=production

# Set the user as node, its non-root user, it doesn't have all the permission to make changes to the root
USER node

COPY --chown=node:node ./src .

EXPOSE 3000

CMD ["node", "index.js"]
```

- Accessing the file system for node image is not allowed

- Give the root permissions, as follows,
```sh
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

## Heredocs - Allow for specifying multiple command to be run with in a single step 

```dockerfile
RUN <<EOF
apt update
apt install node -y
EOF
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

- Update the connected volumes when the new dependencies are added, which creates new annonymous volumes with
updated node_modules, since we are linking node_modules volume to docker image
```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V
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

- Once `ngnix` container configured to load balance the requests we can scale the node-app to 
serve multiple requests.

## Scale specific service with docker-compose

Scale `node-express-app` service to have 2 instances using,
```
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-express-app=2
```

It starts multiple instances of `node-express-app`(name of the service defined in the docker-compose.yml), using `ngnix` we can proxy the requests to these instances.

## Deploying docker images to cloud

- Make sure to push your code including `Dockerfile` and `docker-compose.yml` files to `git/gitlab` or any version control system that you use. Don't push envirionment variables stored in `docker-compose.prod.yml` file, they can be directly stored in the ubuntu container where the prod app runs.
- Select any cloud provider of your choice and run an ubuntu instance
- Install `docker` and `docker-compose` on the running instance by logging in using `ssh` from your local machine
### Setting/stroing environment variables in the running container

- Exporting the environment variables
```
$ EXPORT MONGO_USER=root
```

> We may loose the environemnt variables set using this approach each time ubuntu instance restarts.

- Store all the environmanet variables in a `.env` file in the ununtu instance and load them each time
it restarts

Create a file `.env` in the root and store all the environemnt variables
```
MONGO_USER=root
MONGO_PASSWORD=root
```

- Open the `.profile` file and edit it to load the `.env` file each time instance restarts
```
set -o allexport; source /root/.env; set +o allexport
```

> There are better ways to store the creds. Consider the best option, so that we don't compromise prod creds.

- Create a folder called to `/app` to store the code in the `prod server`

- Clone the source code into `/app` folder, install `git` on ubuntu server if it wasn't installed before.

- Run the `docker-compose up` on in the server and verify that it works.

- Request an API endpoint using the `public IP address` of the ubuntu server.

### Make the changes and push the changes to prod

- Once the changes are made, login to server and pull the latest changes to the `/app` folder
and rebuild only `node-app` container using `docker-compose`.

- Pass `--no-deps` option to make sure any dependent services for `node-express-app` are not rebuilt,
in this case our `node-express-app` depends on `mongo` service, it is avoid docker-compose to rebuild the `mongo` image.

- Start only the `node-express-app` container because only the source code of th app has been changed.
```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-express-app
```

## Build and publish image to dockerhub and deploy to prod server instead of git pull

- Instead of building docker images and starting services on prod server everytime the code changes, we can build the docker images and publish it to our private repo and pull those images and start the service quickly in the prod server.

- Specify the image name pushed to the dockerhub in  `docker-compose.yml` adding an `image` key under `node-express-app`

- Make the changes to the source and rebuild the image using docker-compose as,
```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-express-app
```

- Push the newly built image to the docker hub using docker-compose, push only the `node-express-app`
```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-express-app
```
> You can also push the image using `docker push` command too

- Go to the prod server and pull the latest image build using docker-compose
```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull 
```

- Start the services
```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps node-express-app
```

## Container Orchestration using docker swarm

- To push changes without impacting prod being down.

- Setup docker swarm in the prod server and is shipped with docker and is disabled by default verify that by checking
```
$ docker info
```

- Enable the docker swarm
```
$ docker swarm init
```

- If it throws an error with multiple IP addressing being used in the prod server, update the swarm with `--advertise-addr` option
```
$ docker swarm init --advertise-addr 124.1.2.3
```

- Use `docker service --help` command to access docker swarm related commands

- Add `deploy` and other options to `docker-compose.prod.yml` file to have swarm related commands, [doc](https://docs.docker.com/compose/compose-file/compose-file-v3/#deploy)

- Add this under `node-express-app` for `docker-compose.prod.yml`
```yml
version: "3"
  services:
    node-express-app:
      deploy:
        replicas: 8
        restart_policy:
          condition: any
        update_config:
          parallelism: 2 # Updates 2 containers at a time
          delay: 15s
```

- Pull the changes to prod server and kill all the running containers and start the services using `docker stack`
```
$ docker stack deploy -c docker-compose.yml docker-compose.prod.yml my-node-app
```

### Docker swarm related commands

- List all the running nodes
```
$ docker node ls
```

- List all the running stacks
```
$ docker stack ls
```

- List all the services running in a container
```
$ docker stack services
$ docker service ls
```

- Verify that 8 replicas created running
```
$ docker ps
```

### Push the changes and roll the updates without impacting the service

- Make the changes in the source code

- Build the brand new `node-express-app` image and push it to the dockerhub or pull the code changes in prod server.

- Build the stack again
```
$ docker stack deploy -c docker-compose.yml docker-compose.prod.yml my-node-app
```

- Verify that how docker-swarm in rolling the updates only to 2 containers at a time, this is because of the `parallelism` key we set on `depoly`s `update_config`
```
$ docker stack ps my-node-app
```

### Scale docker horizontally with ngnix load balancer

- Create a node app
```js
var http = require('http');
var serverName = process.env.SERVER_NAME || 'default';
var port = process.env.PORT || 8000;

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end(`Hello World from server ${serverName}\n`);
});

server.listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);
```

- Create a `Dockerfile` to node app image
```
FROM mhart/alpine-node
COPY index.js .
EXPOSE 8000
CMD node index.js
```

- Build a node image
```shell
$ docker build -t node-app .
```

- Start 2 NodeJS processes
```shell
$ docker run -d -e "SERVER_NAME=chicken" --name chicken node-app
$ docker run -d -e "SERVER_NAME=steak" --name steak node-app
```

- Create a nginx load balancer using `ngnix` image

- Create a `ngnix.conf` file in the root 
```
upstream app {
    server chicken:8000;
    server steak:8000;
}

server {
  location / {
    proxy_pass http://app;
  }
}
```

- Create a `Dockerfile` to build a ngnix image and to start the load balancer 
```
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

- Build the ngnix image
```shell
$ docker build -t app-ngnix .
```

- Start the ngnix load balancer
```shell
$ docker run -d -p 8080:80 --link chicken --link steak app-nginx
```

### Dokcer image with high availabilty

- `restart: always` can also be added in the `docker-compose.yml` file too.
```shell
$ docker run --restart always --name test-app hello-world
```

- `restart: always` can also be added in the `docker-compose.yml` file too and scale it using
```shell
$ docker-compose up --scale hello-world=3
```

### Pipe log output to STDOUT using Dokcerfile

```dockerfile
FROM mhart/alpine-node
COPY index.js .
RUN ln -sf /dev/stdout ./docker.log
CMD node index.js
```