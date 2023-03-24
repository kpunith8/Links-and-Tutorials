## PostgreSQL

- Create a folder `pgdata` in the project root directory
- Exlude the pgdata folder from the `.gitignore` file
- Create a `docker-compose.yml` file in the project root directory
```yml
version: '3.8'
services:
  db:
    image: postgres:12
    ports:
      - "5432:5432"
    volumes:
      - "./pgdata:/var/lib/postgresql/data"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=studentdb
    restart: always
```

- Start the docker-compose
```
$ docker-compose up -d
```

- Check whether the service is running
```
$ docker-compose ps
```

- Get into the container
```
$ docker-compose run db bash
```

- Login to the psql inside the bash
```
$ psql --host=db --username=postgres --dbname=studentdb
```

## MongoDB - local development

- MacOS needs to give permissions to file sharing before mounting, `Preferences` -> `Resources` -> `File Sharing`

- Create the container `mongo-dev` running on port `27017` and mounted to local storage
```
$ docker run -d -p 27017:27017 -v /Users/punith.k/mongo/data:/data/db --name mongo-dev mongo:4.2
```

- Pass the environment variables to have username and password
```
$ docker run --env MONGO_INITDB_ROOT_USERNAME=root --env MONGO_INITDB_ROOT_PASSWORD=root
```

- Run the container in interactive mode and access the mongo shell and connect from local
```
$ docker exec -it mongo-dev bash
```

- Run the `mongo` commands, `db`, `use db`, `show collections` and `insert`, `find`, etc
```
# mongo -u "root" -p "root"
> use myDB
> db.books.insert({"name": "Harry Potter"})
> db.books.find()
```

## MySQL and phpmyadmin 

```
$ docker run --name db-mysql -d \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=change-me \
    -v mysql:/var/lib/mysql \
    --restart unless-stopped \
    mysql:8 (choose latest if needed)
```
The `--restart` parameter instructs Docker to always restart the container. This means your MySQL database will run without intervention after host machine reboots or Docker daemon updates. The unless-stopped policy used here won’t start the container if you manually stopped it with docker stop.

- Inspect the running container for its IP address 
```
$ docker inspect <container-name>
```
We can use the IP address to connect to `phpmyadmin`

- Connect to mysql db 
```
$ docker exec -it db-mysql mysql -p
```

- Read the logs 
```
$ docker logs <container-name> --follow 
```

- Use `phymyadmin` image to connect to mysql db
```
$ docker run --name mysql-admin -p 8080:80 -d -e PMA_ARBITRARY=1 phpmyadmin
```

- Open `localhost:8080` to connect to the db using IP address of mysql and its username, password 

### Create using docker-compose

- Create a docker-compose.yml file having,
```yml
services:
  db: 
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
  phpMyAdmin:
    image: phpmyadmin
    environemnt:
      PMA_ARBITRARY: 1
    ports:
      "8080:80"
```

- Run docker compose to start the services 
```
$ docker-compose up -d
```

### Notes 

Stop the container and remove it to re-create if any config needs to be updated
```
$ docker stop <container-name>
$ docker rm <container-name>
```