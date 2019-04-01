> Prerequisites:

  - Download Spring Tool Suite
  - Need JDK 1.8 and recent maven to be set in the STS

> Create maven project and add maven-compiler-plugin to make sure it compile against jdk 1.8

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.2</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>

> Add spring dependency from spring.io -> projects -> spring framework

  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.0.5.RELEASE</version>
    </dependency>
  </dependencies>

> Needs to add configuration through xml file

  - Add applicationContext.xml - Name doesn't matter
  - Add it to src/main/resources folder
    - Right click on src/main/resources -> new -> Spring Bean Configuration File -> fileName.xml -> finish

  - Define bean: Add bean to the conf file
  - Setter Injection, constructor Injection can be used together
    - setter Injection: Create setter in serviceImpl class - for customerRepository
    - constructor Injection: index based

  - Autowire:
    - Spring automatically wires beans
    - 4 types of autowiring: byType, byName, constructor, and no (not autowired at all)

> Configuration using Annotation configuration through xml:

  - Add context name space to applicationContext.xml file in the NameSpaces tab
    and add the following to xml:

    <context:annotation-config />
    <context:component-scan base-package="com.spring.sample" />

  - Stereotype annotations:
    - @Component - Any POJO
    - @Service - business login layer
    - @Repository - data layer

> Configuration using Java:

  - No applicationContext.xml file, use AutoConfig.java file

> Bean Scopes:

  - 5 Scopes:
    Singleton, Prototype -> valid in any configuration
    Request, Session, Global -> Valid only in web-aware spring projects

  - Singleton -> Default scope for spring - no need to specify
      - use @Scope("singleton") annotation
      - or use @Scopr(ConfigurableBeanFactory.SCOPE_SINGLETON) - using Java constant
      - in xml specify scope="singleton" in <bean />

  - Prototype -> per request, unique object, and opposite to singleton, mention prototype instead of singleton as scope

> Properties:

  - XML configuration:
    - add <context:property-placeholder location="app.properties" />
    - can be injected to bean using,
      <bean name="" class="" >
        <property name="dbUserName" value="${dbUserName}" />
      </bean>

  - Java Configuration:
    - add @PropertySource("app.properties") to
		

# Rest Services using JAX-RS: `Koushik` - `Java Brains`

- Use `@Context UriInfo` and` @Context HtppHeaders` to get additions info of the query params.

- Use `@BeanParam` to get all param in single class, instead of using,
	```java
	@GET
	public List<Message> getMessages(@QueryParam("year") int year, @QueryParam("start") int start,
	@QueryParam("size") int size)
	{
	}
	```

-	Create a class to assign these params as follows,
	```java
	class FilterBean
	{
		private @QueryParam("year") int year;
		private @QueryParam("start") int start;
		private @QueryParam("size") int size;
		// Write getters and setters for each query params
	}
	```

- Replace the above call as follows,
	```java
	@GET
	public List<Message> getMessages(@BeanParam FilterBean filterBean)
	{
		// access them using
		filterBean.getYear();
	}
	```

