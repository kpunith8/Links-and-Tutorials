# Spring Boot:

- Creates stand-alone, production-grade applications using Spring
- Opinionated
- Convention over configuration

## Creating Project:

- Use Spring STS as IDE
- Create maven project skipping archetype selection
- Add the following to pom to make it spring.boot application
  ```xml
  <parent>
  		<groupId>org.springframework.boot</groupId>
  		<artifactId>spring-boot-starter-parent</artifactId>
  		<version>1.4.2.RELEASE</version>
  </parent>
  <!-- Add this dependency to create web-app -->
  <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
  ```
- Create a class with main method
- Make it a spring app specifying annotation `@SpringBootApplication`


### Create using Spring Initializr - online tool
- https://start.spring.io/ - go to this link and specify the dependency and other things to generate one
- Download the project and import in  Spring STS IDE

### Configure using properties file
- Update the default tomcat port 8080 to some port you want using, application.properties file,
  set server.port property as follows `server.port=3000`
- Check common application properties to explore other configuration options.

## Spring data JPA (Java Persistent API)- The data tier
- Create a project with JPA, Web, and Apache Derby (embedded database for testing purpose) dependencies
- To use the JPA, mark class with `@Entity` annotation - JPA creates a table with the class name
- Create an interface for repository and extend with `CRUDRepository<Entity, Primary-Key-Type>`
  ```java
  public interface TopicRepository extends CrudRepository<Topic, String>{
  }
  ```
- Initialize repository in service by auto wiring, JPA provides built in methods for performing basic operations like, find, save etc
