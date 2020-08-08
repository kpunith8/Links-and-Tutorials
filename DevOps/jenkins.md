## Jenkins with Docker and running in AWS

- Pull the docker image for `jenkins/jenkins:lts`
```
docker pull jenkins/jenkins:lts
```

- Run the docker with `8080` port exposed with mounting `jenkins_home` to local system
  in `detached` mode
```
docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
```

- Open the browser and access the jenkins in `htpp://localhost:8080`
  Asks for initial password, get it from logs from running container

- List the running containers
```
docker ps -a
```

- Read the logs of the container to get the initial admin password
`14ff823f8d5e4884bb4e6f44c501127d`

```
docker logs <container-id>
```

## Add Slaves

- Go to `Configure Global Security` -> `Agents` -> `Fixed: 50000`

- Go to `Manage Nodes` -> `New Node` -> Give a name -> Select Launch Method as `Launch agent by connecting it to the master`

- If you are using `ubuntu docker image` or `AWS EC2 instance` make sure to install `open_jdk_8` on them.
  ```
  $ apt-get install -y openjdk-8-jdk
  ```

- We need to download the `agent.jar` from slave node and copy it to `ubuntu image` using `fileZilla` and run the command
  given in the slave page on the machine.

> If you are using docker containers as slaves while executing the command to register use the ip address of
  the master node instead of localhost in the url
