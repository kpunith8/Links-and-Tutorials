## Docker setup for postgreSQL

- Create a folder `pgdata` in the project root directory
- Exlude the pgdata folder from the `.gitignore` file
- Create a `docker-compose.yml` file in the project root directory
```yml
version: '3.8'
services:
  db:
    image: postgres:15.1-alpine
    ports:
      - "5432:5432"
    volumes:
      - "./pgdata:/var/lib/postgresql/data"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=studentdb
    restart: always
volumes:
  pgdata:
```

- Start the docker-compose in detatching mode (run in the background)
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

### Run the container using docker run command 

```
$ docker run -d \
  --name db \
  -e POSTGRES_PASSWORD=password \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  --restart unless-stopped \
  postgres:15.1-alpine
```