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
