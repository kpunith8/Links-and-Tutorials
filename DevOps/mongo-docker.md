## Docker image for mongo - local development

- MacOS needs to give permissions to file sharing before mounting, `Preferences` -> `Resources` -> `File Sharing`

- Create the container `mongo-dev` running on port `27017` and mounted to local storage
  ```
  $ docker run -d -p 27017:27017 -v /Users/punith.k/mongo/data:/data/db --name mongo-dev mongo:4.2
  ```

- Run the container in interactive mode and access the mongo shell and connect from local
  ```
  $ docker exec -it mongo-dev bash
  ```

- Run the `mongo` commands, `db`, `use db`, `show collections` and `insert`, `find`, etc
