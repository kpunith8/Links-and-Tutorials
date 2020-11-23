## ifdef-loader

`Webpack loader` that allows JavaScript or TypeScript conditional compilation
(#if ... #elif ... #else ... #endif) directly from Webpack.
```js
/// #if DEBUG
console.log("there's a bug!");
/// #endif
```

Create the mirageJS fake server only if `CYPRESS=true` set in npm scripts
```json
"scripts": {
  "start:cypress_server": "CYPRESS=true npm run build"
}
```

Configure `webpack.config.js` file to load the `ifdef-loader`
```js
const queryString = require('querystring')

const cypressOptions = {
  CYPRESS: process.env.CYPRESS || false
}
const cypressIfDefQuery = queryString.encode(cypressOptions)

module: {
  strictExportPresence: true,
   rules: [
     {
       test: /index\.js$/, // Entry point of the app or place where the ifdef condition present
       use: {
         loader: `ifdef-loader?${cypressIfDefQuery}`
       }
     }
   ]
}
```

Actual code in `index.js` runs only `CYPRESS` is set to `true`
```js
import {Server, Response} from 'miragejs'

/// #if CYPRESS
if (global.Cypress) {
  global.loadInitialConfiguration()
  // eslint-disable-next-line no-new
  new Server({
    logging: false,
    environment: 'test',
    routes() {
      this.post('https://sentry.io/*', () => ({})) // Could any other tools such as mix-panel
      this.passthrough('/public/docs/*') // To pass through any public files usage in real code

      const methods = ['get', 'put', 'patch', 'post', 'delete']
      methods.forEach(method => {
        this[method]('/*', async (_, request) => {
          const [status, headers, body] = await global.handleFromCypress(
            request
          )
          if (status === 500)
            // an exception in a mirage mock server route
            throw new Error(`${body.message}/n${body.stack}`)
          else return new Response(status, headers, body)
        })
      })
    },
  })
}
/// #endif
```

Here `global.handleFromCypress()` and `global.loadInitialConfiguration()` are required to
run Cypress tests with initial data, refer `miragejs` documentation for more info, these
methods will reside in `cypress/support/index.js`

API can change time to time, please refer to latest versions documentation for
updated API if any. Using `miragejs - 0.1.40` in this example
```js
// cypress/support/index.js
global.Cypress.on('window:before:load', globalWindow => {
  globalWindow.handleFromCypress = async request => {
    const response = await global.fetch(request.url, {
      method: request.method,
      headers: request.requestHeaders,
      body: request.requestBody,
    })
    const contentType = response.headers.get('Content-Type')
    const content = await (contentType === 'application/json'
      ? response.json()
      : contentType === 'text/plain'
      ? response.text()
      : {})
    return [response.status, response.headers, content]
  }

  globalWindow.loadInitialConfiguration = () => {
    globalWindow.config = {
      ...globalWindow.config,
      // Set fake Mixpanel and Sentry config to make sure we activate it but not
      // mess out real app statistics
      mixpanel_token: '1234567890',
      sentry_dsn: 'https://1234567890@sentry.io/123456789',
      server: null,
      api: {
        user: '/user',
        auth: '/auth',
        products: 'prod'
      },
    }
  }
})

Cypress.Server.defaults({ignore: () => undefined})
```

## miragejs - 0.1.41

API mocking library for front end during development.

### Using with React Component

```js
// src/App.js
import React, { useState, useEffect } from "react"
import { createServer } from "miragejs"

let server = createServer()
server.get("/api/users", { users: [{ id: 1, name: "Bob" }] })

export default function App() {
  let [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users)
      })
  }, [])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Using as a separate server for the whole app

Separate the server logic so that we can make calls to multiple end points.
```js
// src/server.js
// There are multiple ways to seed the data
// choose wisely based on your needs,
// mirage offers a rich API for lot of use cases you may come accross
import users from '../fake-data/users.json'

import { createServer } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    routes() {
      // If you have a common namespace for your API, don't have
      // to repeat it in each get or post action
      this.namespace = "api"

      // You will get an array of users object as declared in the json file
      this.get('**/users', {count: 10, users}),

      this.post('**/users/:id/user', () => ({}))
    },
  })

  return server
}
```

Create `users.json` file with some dummy data, `fake-data/users.json`
```json
{
  "users": [
    {
      "name": "Punith",
      "email": "abc@test.com"
    },
    {
      "name": "Ram",
      "email": "ram@test.com"
    }
  ]
}
```

Use it in the entry of the page and will create the fake server only during
development mode
```js
// src/index.js
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { makeServer } from "./server"

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

ReactDOM.render(<App />, document.getElementById("root"))
```

Make a fetch call to `api/users` anywhere in the app while in development mode
to get the live data.


## Jest

Code coverage with Jest using npm script
```
jest --watchAll --coverage
```
