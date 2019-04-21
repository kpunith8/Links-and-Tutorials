# Docker - intro

## Installation on Windows 10
- Enable Hyper-V feature in Control Panel -> Programs and Features -> Turn windows features on or off -> Check - Hyper-V
- If Hyper-V is not running, enable Intel VT/VT-x or AMD-V in BIOS

### Basic commands
- List the sever and docker version installed on the system
  $ docker version

- Displays all the information about the docker images, containers and more details
  $ docker info

- To run the docker container
  $ docker run <container-name>

- List the containers running or stopped
  $ docker ps

- List the running containers
  $ docker ps -a

- List all the images
  $ docker image ls

- List the only running containers
  $ docker container ls

- Installing the docker gives the client and the daemon
- Client makes API calls to daemon
- Daemon implements the Docker Remote API
- Docker hub is the default public registry
- The daemon pulls the images that it doesn't already have

### Containers and Images

- A container is launched by running an image. An image is an executable package that includes everything needed to run an application; the code,
  a runtime, libraries, environment variables, and configuration files.

- A container is a runtime instance of an image.

- A container runs natively on `Linux` and shares the kernel of the host machine with other containers.
  It runs a discrete process, taking no more memory than any other executable, making it lightweight.
  By contrast, a virtual machine (VM) runs a full-blown `guest` operating system with virtual access to host resources through a `hypervisor`.
  In general, VMs provide an environment with more resources than most applications need.

- Pull an image of the Ubuntu OS and run an interactive terminal inside the spawned container:
  $ docker run --interactive --tty ubuntu bash

  - It opens the interactive bash shell - enter `hostname` and then `exit`

- Pull and run a Dockerized nginx web server that we name, webserver:
  $ docker run --detach --publish 80:80 --name webserver nginx

  - Open the local web browser and point to `http://localhost` to see the server running on port `80`

- Remove all the containers
  $ docker container rm webserver <container-1> <container-2>

- other commands
  $ docker pull alpine -> pulls the alpine image from the docker hub registry
  $ docker pull ubuntu -> to pull the latest ubuntu image

  $ docker images ; lists all the images in the local system

  $ docker rmi <image-name:tag-name or hashcode> ; to remove the image\

### Dockerfile

- Portable images are defined by something called a `Dockerfile`.

- `Dockerfile` defines what goes on in the environment inside your container. Access to resources like `networking interfaces`
  and disk drives is virtualized inside this environment, which is isolated from the rest of your system, so you need to `map ports` to the outside world, and be specific about what files you want to “copy in” to that environment. However, after doing that, you can expect that the build of your app defined in this `Dockerfile` behaves exactly the same wherever it runs.

### Create an python web-app image using Python, Flask, and Redis

- Refer the example pushed to `git`, https://docs.docker.com/get-started/part2/

- Build the app running the command, which creates a Docker image, which we’re going to name using the `--tag` option. Use `-t`
  if you want to use the shorter option.
  $ docker build --tag=hello-html .

- Run the app, mapping your machine’s port `4000` to the container’s published port 80 using `-p`
  $ docker run -p 4000:80 hello-html



# Container Life Cycle

  $ docker start <container>
  $ docker stop <container>
  $ docker rm <container>

  $ docker run  -d --name web -p 80:8080 <name-of-the-docker>
    -d ; runs in the detatch mode
    -p 80:8080 ; specifies the port name
  $ docker start/stop <name-of-the-image>

  $ docker run -it --name temp ubuntu@latest /bin/bash
    `-it` option tells to run in interactive mode in the command line and starts bash from ubuntu image pulled to local

    come out from interactive mode without killing the container by exit command use, Ctrl + P + Q

  $ docker stop $(docker ps -aq) ; all the dockers -q to be quite - which gives all the containers

### MySQL and Spring-boot app on container
-
