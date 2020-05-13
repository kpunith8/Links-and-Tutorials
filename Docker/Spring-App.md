### MySQL and Spring-boot app on container

- Pull mysql and openjdk image
  ```
  $ docker pull mysql
  $ docker pull openjdk
  ```

- Create a network run both mysql database and java app in one network
  ```
  $ docker network create user-mysql

  # List the created network
  $ docker network ls
  ```

- Run the mysql image in created network
  ```
  $ docker container run --name mysqldb --network user-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=bootdb -d mysql
  ```

- Check the logs that the mysql container in running properly
  ```
  $ docker logs mysqldb
  ```

- Create the spring boot app Clone the project: https://github.com/TechPrimers/docker-mysql-spring-boot-example

- `application.properties` file should have the following details, Update the files or project appropriately
  ```
  spring.datasource.url = jdbc:mysql://mysqldb/bootdb
  spring.datasource.username = root
  spring.datasource.password = root
  spring.datasource.platform= mysql
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
  ```

- Install the maven project to produce the jar, give a name to the jar, in `pom.xml` under `<build>` tag as follows,
  ```
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
          <finalName>users-mysql</finalName>
        </configuration>
      </plugin>
    </plugins>
  </build>
  ```

- Create the `Dockerfile` in the root directory of the spring project, as follows
  ```
  FROM openjdk:8
  COPY target/users-mysql.jar users-mysql.jar
  EXPOSE 8086
  ENTRYPOINT ["java", "-jar", "users-mysql.jar"]
  ```

- Build the spring-boot image
  ```
  $ docker build --tag=user-api .
  ```

- Run the spring-boot app in the created network
  ```
  $ docker container run --network user-mysql --name user-jdbc-container -p 8086:8086 -d user-api
  ```

- Verify that both mysql and user-api containers running
  ```
  $ docker container ls
  ```

- Check the logs that the spring boot has started without errors
  ```
  $ docker logs user-jdbc-container
  ```

- Open the browser and query for the resource, run `http://localhost:8086/all/create` to insert a dummy row to db, then `http://localhost:8086/all/` to see the inserted result

### Executing commands inside a running container:

- Open a created image in command line, interactive and in terminal, `-it` option
  ```
  $ docker exec -it <container-name> mysql -u<username> -p<password>
 ```

- Create the user and password if needed
  ```
  $ CREATE USER 'test'@'localhost' IDENTIFIED BY 'root';
  ```
