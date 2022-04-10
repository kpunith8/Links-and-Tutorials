# Cypress - e2e Testing Framework

### Additional tools and libraries needed

- `miragejs` package for mocking the service calls

### Code Coverage

- Packages needed
  - `istanbul-lib-coverage`
  - `nyc`
  - `@cypress/code-coverage` and
  - `babel-plugin-istanbul`

- Add this entry to scripts section in `package.json`

  - `cypress run` runs the code in chrome headless mode

  ```
  {
    "scripts": {
      "cypress:run": "cypress run && nyc report --reporter=text-summary"
    }
  }
  ```

- Add these 2 entries to `plugins/index.js`

  ```javascript
  module.exports = (on, config) => {
    on('task', require('@cypress/code-coverage/task'))
    on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
  }
  ```

- Add `istanbul` to babel plugins array to process the coverage

- Add the import to `support/index.js` to support the coverage

  ```javascript
  import '@cypress/code-coverage/support'
  ```
## Stubing server calls 

- `GET` API call
```js
describe('app initialization', () => {
  it('should initialize and load the app', () => {
    cy.seedAndVisit()

    cy.get('.todo-list li').should('have.length', 2)
  })
})
```

- `POST` API call
```js
cy.server()
cy.route({
  method: 'POST',
  url: '/api/todos',
  // status: 500, // To throw an error, with an empty response body
  response: {
    id: 3,
    title: 'A new todo',
    completed: false
  }
})
```

- Update and delete an item 
```js
describe('List Item Behavior', () => {
  it('Deletes an item', () => {
    cy.server()
    cy
      .route({
        method: 'DELETE',
        url: '/api/todos/*',
        response: {}
      })
      .as('delete')

    cy.seedAndVisit()

    cy.get('.todo-list li').as('list')

    cy
      .get('@list')
      .first()
      .find('.destroy')
      .invoke('show')
      .click()

    cy.wait('@delete')

    cy.get('@list').should('have.length', 3)
  })

  it.only('Marks an item complete', () => {
    cy.server()
    cy.seedAndVisit()
    cy.fixture('todos').then(todos => {
      const target = todos[0]
      cy
        .route(
          'PUT',
          `/api/todos/${target.id}`,
          Cypress._.merge(target, { isComplete: true })
        )
        .as('update')
    })

    cy
      .get('.todo-list li')
      .first()
      .as('first-todo')

    cy
      .get('@first-todo')
      .find('.toggle')
      .as('checkbox')

    cy.get('@checkbox').click()

    cy.wait('@update')

    cy.get('@checkbox').should('be.checked')

    cy.get('@first-todo').should('have.class', 'completed')

    cy.get('.todo-count').should('contain', 3)
  })
})
```

## Extract the API route call used in multiple tests as a command 

- Put it under `support/commands.js`
```js
Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:todos.json') => {
  cy.server()
  cy.route('GET', '/api/todos', seedData) // Add todos.json file with mock data under fixtures folder
    .as(load) // Assign an alias to refer it later in case to wait for the response
  
  cy.visit('/') 
  cy.wait('@load') // Waits for the response to be received before asserting
})
```


## Running in Docker

- Running the cypress in docker and in Jenkins refer, `Docker-Intro.md` file's
  `Installing latest node on docker image` section

## Cypress - xvfb issue

- https://github.com/cypress-io/cypress-docker-images/issues/54 - docker compose
	sh "sudo ps -ef | sudo grep vvfb | sudo grep -v grep | sudo awk '{print \$2}' | sudo xargs kill -9"


## Cypress and Docker

- https://buddy.works/guides/how-dockerize-node-application (Node app docker)
- https://stackoverflow.com/questions/26320901/cannot-install-nodejs-usr-bin-env-node-no-such-file-or-directory
- https://docs.docker.com/develop/develop-images/multistage-build/ - multi stage build - build with more than one images


- Installing latest node on docker image

- https://gist.github.com/remarkablemark/aacf14c29b3f01d6900d13137b21db3a
```bash
FROM ubuntu:latest

RUN set -eux \
    && apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean \
    && rm -rf /var/lib/apt/lists/*
# install libs required to test cypress
ENV NVM_VERSION v0.34.0
ENV NODE_VERSION v13.7.0
ENV NVM_DIR /usr/local/nvm
RUN mkdir $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

ENV NODE_PATH $NVM_DIR/$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

RUN echo "source $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default" | bash

CMD ["bash"]
```

- Running cypress from custom built docker image

```bash
// use npm install with Cypress cache volume specified, instead of npm ci if you don't want caching and remove specifying volume for Cypress cache
$ docker run --volume `pwd`:/app --volume /Users/punith.k/Library/Caches/Cypress/4.0.2:/root/.cache/Cypress/4.0.2 --workdir /app custom-cy:latest bash -c "npm install && npm run test:cypress"

// working command
& docker run --volume `pwd`:/app --workdir /app custom-cy:latest bash -c "npm ci && npm run test:cypress"
```

- https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/
