# NEST

- Install the CLI and create the project
  ```
  $ npm i -g @nestjs/cli

  $ nest new project-name
  ```

## Controllers

- Responsible handling incoming requests and returning responses to the client.

- It receives specific requests for the application. The routing mechanism controls
  which controller receives which requests. Frequently, each controller `has more
  than one route`, and different routes can perform different actions

- Creating a controller in CLI
  ```
  $ nest g controller cats
  ```

- Example controller
  ```js
  import { Controller, Get } from '@nestjs/common';

  @Controller('cats')
  export class CatsController {
    @Get()
    findAll(): string { // Method name can be any arbitrary one
      return 'This action returns all cats';
    }
  }
  ```  

- This can be accessed as `GET /cats`

- `@Get('family')` will produce a route mapping `GET /cats/family`

- When a request handler returns a JavaScript object or array, it will automatically be `serialized` to JSON

- Response's status code is always `200 by default`, except for `POST` requests which use `201`

###  Request object

- Handlers often need access to the client `request` details. Nest provides access to the request object of the underlying platform.
  ```js
  import { Controller, Get, Req } from '@nestjs/common';
  import { Request } from 'express';

  @Controller('cats')
  export class CatsController {
    @Get()
    findAll(@Req() request: Request): string {
      return 'This action returns all cats';
    }
  }
  ```

- The request object represents the `HTTP` request and has properties for the
  `request query string`, `parameters`, `HTTP headers`, and `body`

- Use dedicated decorators instead of using all the request object props, such as `@Body()` or `@Query()`

- Supported below decorators
  ```
  @Request()	             req
  @Response(), @Res()*	   res
  @Next()	                 next
  @Session()	             req.session
  @Param(key?: string)	   req.params / req.params[key]
  @Body(key?: string)	     req.body / req.body[key]
  @Query(key?: string)	   req.query / req.query[key]
  @Headers(name?: string)  req.headers / req.headers[name]
  @Ip()	                   req.ip
  ```

### Resources

- `@Get()`, `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, `@Head()`, and `@All()`.
  Each represents its respective HTTP request method.

### Route Wildcards

- Pattern based routes are supported
  ```js
  @Get('ab*cd')
  findAll() {
    return 'This route uses a wildcard';
  }
  ```

### Status Code

- Status code can be changed as follows, use `@HttpCode()`
  ```js
  @Post()
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }
  ```

### Headers

- To specify a custom response header, you can either use a @`Header()` decorator
  or a library-specific response object (`res.header()`)
  ```js
  @Post()
  @Header('Cache-Control', 'none')
  create() {
    return 'This action adds a new cat';
  }
  ```

### Redirection

- To redirect a response to a specific URL, you can either use a `@Redirect()` decorator
  or a library-specific response object (`res.redirect()`)
  ```js
  @Get()
  @Redirect('https://nestjs.com', 301)
  ```

- Returned values will override any arguments passed to the `@Redirect()` decorator.
  ```js
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  ```

### Route Parameters

- Get the route params using `@Param()`, like `GET /cats/1`
  ```js
  @Get(':id')
  findOne(@Param() params): string {
    console.log('param id', params.id);
    return `This action returns a #${params.id} cat`;
  }
  ```

- Can also be written as
  ```js
  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns a #${id} cat`;
  }
  ```

### Sub-Domain Routing

- The `@Controller` decorator can take a `host` option to require that the HTTP
  host of the incoming requests matches some specific value.
  ```js
  @Controller({ host: 'admin.example.com' })
  export class AdminController {
    @Get()
    index(): string {
      return 'Admin page';
    }
  }
  ```

### Asynchronicity

- `async` function has to return a Promise
  ```js
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }
  ```

- Nest route handlers are even more powerful by being able to return `RxJS observable streams`.
  Nest will `automatically subscribe` to the source underneath and take the last emitted value (once the stream is completed).
  ```js
  @Get()
  findAll(): Observable<any[]> {
    return of([]);
  }
  ```

### Request payloads

- Extract the request payloads using `@Body()` decorator

- Determine the `DTO (Data Transfer Object)` schema. A DTO is an object that defines how the
  data will be sent over the network. We could determine the DTO schema by using `TypeScript` interfaces, or by `simple classes`

- Create a `create-cat.dto.ts` - Recommended to use JS classes, because `Classes` are part of the JavaScript ES6 standard,
  and therefore they are preserved as real entities in the compiled JavaScript.
  ```js
  export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
  }
  ```

- And use it as follows
  ```js
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
  ```

### Using express resonse object

- The second way of manipulating the response is to use a `library-specific response` object.
  In order to inject a particular response object, we need to use the `@Res()` decorator.
  ```js
  import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
  import { Response } from 'express';

  @Controller('cats')
  export class CatsController {
    @Post()
    create(@Res() res: Response) {
      res.status(HttpStatus.CREATED).send();
    }

    @Get()
    findAll(@Res() res: Response) {
       res.status(HttpStatus.OK).json([]);
    }
  }
  ```

### Using the controllers in app.module

- Add the controllers to `app.module.ts` so that it is added to module
  ```js
  @Module({
    imports: [],
    controllers: [AppController, CatsController],
    providers: [AppService],
  })
  ```


## Providers

- Providers are a fundamental concept in Nest. Many of the basic Nest classes may be
  treated as a `provider` – `services, repositories, factories, helpers`, and so on. The main
  idea of a provider is that it can `inject dependencies`; this means objects can create various
  relationships with each other, and the function of "wiring up" instances of objects
  can largely be delegated to the Nest runtime system. A provider is simply a class
  annotated with an  `@Injectable()` decorator.

- `Controllers` should `handle HTTP` requests and `delegate more complex tasks to providers`

### Services

- Create a simple `CatsService`. This service will be responsible for `data storage and retrieval`,
  and is designed to be used by the `CatsController`, so it's a good candidate to be defined as a provider.
  Thus, we decorate the class with `@Injectable()`
  ```js
  import { Injectable } from '@nestjs/common';
  import { Cat } from './interfaces/cat.interface';

  @Injectable()
  export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
      this.cats.push(cat);
    }

    findAll(): Cat[] {
      return this.cats;
    }
  }
  ```

- Use it in controller as,
  ```js
  import { Controller, Get, Post, Body } from '@nestjs/common';
  import { CreateCatDto } from './cat.dto';
  import { CatsService } from './cats.service';
  import { Cat } from './interfaces/cat.interface';

  @Controller('catsProvider')
  export class CatsProviderController {
    constructor(private catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
      this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
      return this.catsService.findAll();
    }
  }
  ```

- Created `service` should be registered in `app.module.ts` to inject the `dependency` through
  `constructor(private catsService: CatsService) {}`
  ```js
  @Module({
    imports: [],
    controllers: [AppController, CatsController, CatsProviderController],
    providers: [AppService, CatsService],
  })
  ```

### Scopes

- Providers normally have a `lifetime ("scope") synchronized` with the application lifecycle.
  When the application is bootstrapped, every dependency must be resolved, and therefore every
  provider has to be instantiated. Similarly, when the application shuts down, each provider
  will be destroyed. However, there are ways to make your provider lifetime `request-scoped` as well.

## Modules

- A module is a class annotated with a `@Module() decorator`. The `@Module()` decorator provides
  metadata that Nest makes use of to organize the application structure.

- Each application has at least one module, a `root module`.

- The root module is the `starting point` Nest uses to build the `application graph` -
  the internal data structure Nest uses to resolve module and provider relationships and dependencies.

- The `@Module()` decorator takes a single object whose properties describe the module:

  - `providers`: The providers that will be instantiated by the Nest injector and that may be shared at least across this module.

  - `controllers`: The set of controllers defined in this module which have to be instantiated.

  - `imports`:	The list of imported modules that export the providers which are required in this module.

  - `exports`:	The subset of providers that are provided by this module and should be available in other modules which import this module.


### Feature Modules

- The `CatsController` and `CatsService` belong to the same application domain.
  As they are closely related, it makes sense to move them into a feature module.
  A feature module simply organizes code relevant for a specific feature, keeping
  code organized and establishing clear boundaries. This helps us manage complexity
  and develop with `SOLID` principles, especially as the size of the application and/or team grow.
  ```js
  import { Module } from '@nestjs/common';
  import { CatsController } from './cats.controller';
  import { CatsService } from './cats.service';

  @Module({
    controllers: [CatsController],
    providers: [CatsService],
  })
  export class CatsModule {}
  ```

- Which can be imported in `app.module` with `imports` prop
  ```js
  import { Module } from '@nestjs/common';
  import { CatsModule } from './cats/cats.module';

  @Module({
    imports: [CatsModule],
  })
  export class AppModule {}
  ```

### Shared Modules

- Modules are `singletons` by default, and thus you can share the same instance of
  any provider between multiple modules effortlessly.

- export the `CatsService` provider by adding it to the module's exports array,
  Now any module that `imports` the `CatsModule` has access to the `CatsService` and will
  share the same instance with all other modules that import it as well.
  ```js
  import { Module } from '@nestjs/common';
  import { CatsController } from './cats.controller';
  import { CatsService } from './cats.service';

  @Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
  })
  export class CatsModule {}
  ```

### Module Re-Exporting

- Modules can `export` their `internal providers`. In addition, they can re-export
  modules that they import. In the example below, the `CommonModule` is both imported
  into and exported from the `CoreModule`, making it available for other modules which import this one.
  ```js
  @Module({
    imports: [CommonModule],
    exports: [CommonModule],
  })
  export class CoreModule {}
  ```

### Dependency Injection

- A module class can inject providers as well (e.g., for configuration purposes)
  ```js
  import { Module } from '@nestjs/common';
  import { CatsController } from './cats.controller';
  import { CatsService } from './cats.service';

  @Module({
    controllers: [CatsController],
    providers: [CatsService],
  })
  export class CatsModule {
    constructor(private catsService: CatsService) {}
  }
  ```

### Global Modules

- To avoid importing the same set of modules everywhere, to make a module available
  globally, use `@Global()` decorator
  ```js
  import { Module, Global } from '@nestjs/common';
  import { CatsController } from './cats.controller';
  import { CatsService } from './cats.service';

  @Global()
  @Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService],
  })
  export class CatsModule {}
  ```

- Global modules should be `registered only once`, generally by the `root or core module`.

> Making everything global is not a good design decision. Global modules are available
  to reduce the amount of necessary boilerplate. The `imports` array is generally the
  preferred way to make the module's API available to consumer.

### Dynamic Modules

- It enables to easily create `customizable` modules that can `register` and `configure` providers dynamically.

- Dynamic module definition for `DatabaseModule`
  ```java
  import { Module, DynamicModule } from '@nestjs/common';
  import { createDatabaseProviders } from './database.providers';
  import { Connection } from './connection.provider';

  @Module({
    providers: [Connection],
  })
  export class DatabaseModule {
    static forRoot(entities = [], options?): DynamicModule {
      const providers = createDatabaseProviders(options, entities);
      return {
        global: true, // To register a dynamic module in the global scope
        module: DatabaseModule,
        providers: providers,
        exports: providers,
      };
    }
  }
  ```

> The forRoot() method may return a dynamic module either synchronously or asynchronously

- The `DatabaseModule` can be imported and configured as follows,
  ```js
  import { Module } from '@nestjs/common';
  import { DatabaseModule } from './database/database.module';
  import { User } from './users/entities/user.entity';

  @Module({
    imports: [DatabaseModule.forRoot([User])],
    exports: [DatabaseModule],
  })
  export class AppModule {}
  ```

- If you want to in turn `re-export a dynamic module`, you can `omit` the `forRoot()` method call in the exports array:

## Middleware

- 
