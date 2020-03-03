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

- Running the cypress in docker and in Jenkins refer, `Docker-Intro.md` file's
  `Installing latest node on docker image` section
