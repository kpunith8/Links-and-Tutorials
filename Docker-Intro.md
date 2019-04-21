# Docker - intro

## Installation on Windows 10

- Enable Hyper-V feature in Control Panel -> Programs and Features -> Turn windows features on or off -> Check - Hyper-V
- If Hyper-V is not running, enable Intel VT/VT-x or AMD-V in BIOS

### Basic commands

- List the sever and docker version installed on the system
  ```
  $ docker version
  ```

- Displays all the information about the docker images, containers and more details
  ```
  $ docker info
  ```

- To run the docker container
  ```
  $ docker run <container-name>
  ```

- List the containers running or stopped
  ```
  $ docker ps
  ```

- List the running containers
  ```
  $ docker ps -a
  ```

- List all the images
  ```
  $ docker image ls
  ```

- List the only running containers
  ```
  $ docker container ls
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

- Pull an image of the Ubuntu OS and run an interactive terminal inside the spawned container:
  ```
  $ docker run --interactive --tty ubuntu bash
  ```
  - It opens the interactive bash shell - enter `hostname` and then `exit`

- Pull and run a Dockerized nginx web server that we name, webserver:
  ```
  $ docker run --detach --publish 80:80 --name webserver nginx
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

- Refer the example pushed in `https://github.com/kpunith8/docker-python-webapp`.

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
  $ docker container stop <Container NAME or ID>  to stop the container.
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

### MySQL and Spring-boot app on container

-
