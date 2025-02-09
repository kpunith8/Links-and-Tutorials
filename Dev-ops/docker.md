# Docker

## Installation on Windows 10

- Enable `Hyper-V` feature in `Control Panel -> Programs and Features -> Turn windows features on or off -> Check - Hyper-V`
- If Hyper-V is not running, enable `Intel VT/VT-x` or `AMD-V in BIOS`

## Basic commands

### To run the docker container
  ```
  $ docker run <container-name>

  # Give a name to container and run it in background with -d option
  $ docker run --name ubuntu_slave1 -it -d ubuntu
  ```

### Execute commands on running container

```
$ docker exec -it ubuntu_slave1 bash

```
### List the containers running or stopped

```
$ docker ps
```

### List the running containers

```
$ docker ps -a
```

### List all the images

```
$ docker image ls
```

### List the only running containers

```
$ docker container ls
```

### Copy files from host machine to docker container

```
$ docker cp foo.txt mycontainer:/foo.txt

$ docker cp src/. mycontainer:/target
```

### Docker inspect to get the ip address

```
$ docker inspect <container>
```

### Remove all the running dockers in AWS machine (ubuntu)

- At least one docker container should be running before deleting
  ```
  $ sudo docker rm -f $(sudo docker ps -a -q)
  ```

- Installing the docker gives the client and the daemon
- Client makes API calls to daemon
- Daemon implements the Docker Remote API
- Docker hub is the default public registry
- The daemon pulls the images that it doesn't already have

### Containers and Images

- A container is launched by running an image. An image is an executable package that includes everything needed to run an application; the `code`,
    a `runtime`, `libraries`, `environment variables`, and `configuration files`.

- A container is a runtime instance of an image.

- A container runs natively on `Linux` and shares the kernel of the host machine with other containers.
  It runs a discrete process, taking no more memory than any other executable, making it lightweight.
  By contrast, a virtual machine (VM) runs a full-blown `guest` operating system with virtual access to host resources through a `hypervisor`.
  In general, VMs provide an environment with more resources than most applications need.

- Pull an image of the Ubuntu OS and run an interactive terminal inside the spawned container
  ```
  $ docker run --interactive --tty ubuntu bash
  ```
  - It opens the interactive bash shell - enter `hostname` and then `exit`

- Pull and run a Dockerized `nginx` web server that we name, `webserver`:
  ```
  $ docker run --detach --publish 80:80 --name webserver nginx

  or
  $ docker run -d -p 80:80 --name webserver ngnix
  ```
  - Open the local web browser and point to `http://localhost` to see the server running on port `80`

- Remove all the containers
  ```
  $ docker container rm webserver <container-1> <container-2>
  ```

### Dockerfile

- Portable images are defined by something called a `Dockerfile`.

- `Dockerfile` defines what goes on in the environment inside your container. Access to resources like `networking interfaces`
  and disk drives is virtualized inside this environment, which is isolated from the rest of your system, so you need to `map ports` to the outside world, and be specific about what files you want to “copy in” to that environment. However, after doing that, you can expect that the build of your app defined in this `Dockerfile` behaves exactly the same wherever it runs.

### Create an python web-app image using Python, Flask, and Redis

- Refer the example pushed in `https://github.com/kpunith8/docker-python-webapp`. (https://docs.docker.com/get-started/part2/)

- Build the app running the command, which creates a Docker image, which we’re going to name using the `--tag` option. Use `-t`
  if you want to use the shorter option.
  ```
  $ docker build --tag=hello-html .
  ```

- Run the app, mapping your machine’s port `4000` to the container’s published port 80 using `-p`
  ```
  $ docker run -p 4000:80 hello-html
  ```

- On Windows, explicitly stop the container;
  On Windows systems, `CTRL+C` does not stop the container. So, first type CTRL+C to get the prompt back (or open another shell),
  list all the running containers,
  ```
  $ docker container ls
  ```

  Stop the running container using,
  ```
  $ docker stop <Container NAME or ID>
  ```
  Otherwise, you get an error response from the daemon when you try to re-run the container in the next step.

- Run the app in the `background`, in detached mode
  ```
  $ docker run -d -p 4000:80 hello-html
  ```
  You get the `long container ID` for your app and then are kicked back to your terminal. Your container is running in the `background`.

#### Share the image

- If you don’t have a Docker account, sign up for one at http://hub.docker.com. Make note of your username.
- Log in to the Docker public registry on your local machine.
  ```
  $ docker login
  ```

- Tag the image
  The notation for associating a local image with a repository on a registry is `username/repository:tag`.
  The tag is optional, but recommended, since it is the mechanism that registries use to give Docker images a version. Give the repository and tag meaningful names for the context, such as `get-started:part2`. This puts the image in the `get-started repository` and `tag it as part2`.

  Now, put it all together to tag the image. Run docker tag image with your `username, repository, and tag names` so that the image uploads to your desired destination. The syntax of the command is:
  ```
  $ docker tag image username/repository:tag
  ```

  For example:
  ```
  $ docker tag hello-html <user-name>/get-started:python-webapp
  ```

#### Publish the image

- Upload your tagged image to the repository
  ```
  $ docker push <username>/repository:tag
  ```

#### Pull and run the image from the remote repository

- From now on, you can use docker run and run your app on any machine with this command:
  ```
  $ docker run -p 4000:80 <username>/repository:tag
  ```

## Services

- Services are just `containers in production`. A service only `runs one image`, but it codifies the way that image runs -
  what ports it should use, how  many replicas of the container should run so the service has the capacity it needs, and so on.
  Scaling a service changes the `number of container instances running` that piece of software,
  assigning more computing resources to the service in the process.

- write `docker-compose.yml` file.

### Run your new load-balanced app

- Before we can use the `docker stack deploy` command, first run:
  ```
  $ docker swarm init
  ```

- Now let’s run it. You need to give your app a name. Here, it is set to web-getstarted
  ```
  $ docker stack deploy -c docker-compose.yml web-getstarted
  ```

  - Our single service stack is running 5 container instances of our deployed image on one host. Verify that it is running,
  - Get the service ID for the one service in our application
    ```
    $ docker service ls
    ```

  - Alternatively, you can run `docker stack services`, followed by the name of your stack
  ```
  $ docker stack services web-getstarted
  ```

  - List the tasks for your service
  ```
  $ docker service ps web-getstarted_web
  ```

### Take down the app and the swarm

- Take the app down with `docker stack rm`
  ```
  $ docker stack rm web-getstarted
  ```

- Take down the swarm.
  ```
  $ docker swarm leave --force
  ```  

### Passing params to the docker image

- Sleep ubuntu for 5 seconds
  ```
  $ docker run ubuntu sleep 5
  ```

- Specify the value dynamically, create an image with `ENTRYPOINT` - at startup
  ```
  FROM ubuntu

  ENTRYPOINT ["sleep"]
  ```

- Usage: `$ docker run ubuntu-sleeper 10`

- Specify default value to sleep if nothing is passed from command line
  ```
  FROM ubuntu

  ENTRYPOINT ["sleep"]

  CMD ["5"]
  ```

- Usage: `$ docker run ubuntu-sleeper`, sleeps for 5 seconds

- Specify the entry point from command line
  ```
  // Here sleep2.0 is a custom sleep utility
  $ docker run --entrypoint sleep2.0 ubuntu-sleeper 10
  ```

### Networking

- Docker has built-in `DNS server` running on port `127.0.0.11` which maps each container with their names
  with the ip address as a table, by using which you can access the containers.

### Storage - Persist data in local volumes

- Persists the data in a volume, docker has `storage drivers` to manage the layers
  some of the storage drivers are, `AUFS, ZFS, BTRFS, Device Mapper, Overlay, Overlay2`

- Create a volume
  ```
  $ docker volume create data_volume // stores it in /var/lib/docker/volumes/data_volume
  ```

- Mount the image on volumes to persist the data, called volume mounting
  ```
  $ docker run -v data_volume:/var/lib/mysql mysql
  ```

- It can also be bind to the local folders(location on docker host) as well, called bind mounting
  ```
  $ docker run -v /data/mysql:/var/lib/mysql mysql
  ```

- Can also be writtin using `--mount` option as follows
  ```
  $ docker run /
  --mount type=bind,source=/data/mysql,target=/var/lib/mysql mysql
  ```

## Docker compose

- Using the `docker-compose.yml` - config file

- Link multiple containers, `--link`, without `docker-compose.yml`, needs to link
  containers explicitly.
  ```
  $ docker run -d --name=redis redis

  $ docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
  ```

- `link` adds an entry to `/etc/hosts` file of an `voting-app` container with
  host name `redis` with its internal IP address

- linking may not be good way use it.

## Deploy to private registry

- By default docker registry runs on port 5000, use docker registry API to run
  custom private registry on port 5000
```
$ docker run -d -p 5000:5000 --name registry registry:2
```

- First `tag` the image with private url in it
```
$ docker image tag my-image localhost:5000/my-image
```

- Push the image to local private registry
```
$ docker push localhost:5000/my-image
```

- Pull the image from local registry once pushed
```
$ docker pull localhost:5000/my-image
```

- Or can be pulled from domain or the ip address as well
```
$ docker pull 192.168.0.1:5000/my-image
```

## Docker engine

- Contains `docker daemon`, `REST API`, and `docker CLI`

- Access the remote docker engine using
```
$ docker -H=192.168.0.1:2375 run nginx
```

- Docker can be instructed to use limited resources for a container, by default
  a docker container can use all the resources possible, use `cgroups` to manage
  and control resources to each container using `--cpus` option before running a container

  ```
  // Assign .5 cpu to the ubuntu
  $ docker run --cpus=.5 ubuntu

  // Assign memory
  $ docker run --memory=100m ubuntu
  ```

## Container Orchestration

- To deploy the code in production to maintain stability and keep the docker containers
  running always with the help of scripts
```
$ docker service create --replicas=100 nodejs
```

- `Docker Swarm`, `Kubernetes` - can be used to orchestrate the docker
  ```
  // Initialize the swarm manager
  $ docker swarm init --advertise-addr 192.168.1.12

  // to add workers to the swarm manager
  $ docker swarn join --token <token>
  ```

### Docker service

- It can be used to orchestrate - it is a one or more instances of a single
  application that runs across the swarms of a cluster.

- Create the `3 replicas` of running `web-service` in a swarm
  ```
  // It should be run on docker swarm manager node
  $ docker service create --replicas=3 my-web-server
  ```

## Best Practices

### Cleanup as you go

- Chain `RUN` commands together to clean as you go, instead of this,
  ```
  FROM ubuntu
  RUN apt-get update
  RUN apt-get install -y python

  CMD ['python', 'app.py']
  ```

- Do this instead
  ```
  FROM ubuntu
  RUN apt-get update && \
      apt-get install -y python python-pip && \
      rm -rf /var/lib/apt/lists/*

  CMD ["python", app.py]
  ```

- `rm -rf /var/lib/apt/lists/*` - Cleans repository indexes once the installation is done.

### Keep images tight and focused

- Install only deps/tools/packages are necessary

- use `multi-stage` builds to separate build time and run time dependencies.

- Eg: Node image with nginx server
  ```
  FROM node as build
  WORKDIR /usr/src/app
  COPY package.json package-lock*.json .
  RUN npm install
  COPY public ./public
  COPY src ./src
  RUN npm run build

  FROM ngnix:alpine
  COPY ngnix.conf /etc/ngnix/ngnix.conf
  COPY --from=build /usr/src/app/build /usr/share/ngnix/html
  ```

## Windows: Error using docker in command line

- Error connecting:
  ```
  Get http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.35/info:
  open //./pipe/docker_engine: The system cannot find the file specified.
  In the default daemon configuration on `Windows`, the docker client must be run elevated to connect. This error may also indicate that the docker daemon is not running.
  ```

- Run the following command in `powershell` with admin privileges
  ```
  $ cd "C:\Program Files\Docker\Docker" ./DockerCli.exe -SwitchDaemon
  ```

- `Error: Command failed: docker swarm init, Error response from daemon:`
  could not find the system's IP address - specify one with `--advertise-addr`

- `ERROR: connect ECONNREFUSED 127.0.0.1:4444`
  ```
  $docker swarm init --advertise--addr 127.0.0.1:4444
  ```

### Common Commands

- Common commands used
  ```
  $ docker build -t friendlyhello .  # Create image using this directory's Dockerfile

  $ docker run -p 4000:80 friendlyhello  # Run "friendlyhello" mapping port 4000 to 80

  $ docker run -d -p 4000:80 friendlyhello         # Same thing, but in detached mode

  $ docker container ls                                # List all running containers

  $ docker container ls -a             # List all containers, even those not running

  $ docker container kill <hash>         # Force shutdown of the specified container

  $ docker stop <hash>           # Gracefully stop the specified container

  $ docker rm <hash>        # Remove specified container from this machine

  $ docker container rm $(docker container ls -a -q)         # Remove all containers

  $ docker image ls -a                             # List all images on this machine

  $ docker image rm <image id>            # Remove specified image from this machine

  $ docker image rm $(docker image ls -a -q)   # Remove all images from this machine

  $ docker login             # Log in this CLI session using your Docker credentials

  $ docker tag <image> username/repository:tag  # Tag <image> for upload to registry

  $ docker push username/repository:tag            # Upload tagged image to registry

  $ docker run username/repository:tag                   # Run image from a registry

  $ docker stack ls                                            # List stacks or apps

  $ docker stack deploy -c <composefile> <appname>  # Run the specified Compose file

  $ docker service ls                 # List running services associated with an app

  $ docker service ps <service>                  # List tasks associated with an app

  $ docker inspect <task or container>                   # Inspect task or container

  $ docker container ls -q                                      # List container IDs

  $ docker stack rm <appname>                             # Tear down an application

  $ docker swarm leave --force      # Take down a single node swarm from the manager

  $ docker rmi -f <image-name> # to remove the image, delete all dependent containers to remove an image

  $ docker pull <image-name> # To pull the docker image from the hub.docker.com

  # maps mysql containers database to local systems /opt/data-dir so that we
  # won't loose the data when an container/image is removed
  $ docker run -v /opt/data-dir:/var/lib/mysql mysql

  # Inspect container details, returns the details in JSON format
  $ docker inspect <container-name

  # Get the history of the image, details like size, created date etc, after an image was built using
  # Dockerfile
  $ docker history <image-name>
  ```

## Links

- https://buddy.works/guides/how-dockerize-node-application (Node app docker)
- https://stackoverflow.com/questions/26320901/cannot-install-nodejs-usr-bin-env-node-no-such-file-or-directory
- https://docs.docker.com/develop/develop-images/multistage-build/ - multi stage build - build with more than one images
- https://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/
- https://aboullaite.me/docker-hacks/
- https://www.docker.com/blog/how-to-dockerize-react-app/
- https://www.docker.com/blog/8-top-docker-tips-tricks-for-2024/