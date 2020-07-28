## Building a JavaScript Environment: Cory House - Pluralsight course

### Editor Selection

- `VS Code` from Microsoft

- `Atom` from Github

> VS Code

### Package managers

- Use `node security platform` to check for `package vulnerabilities`
	```
	$ npm install -g nsp
	```

- Run this to check, using,
	```
	$ nsp check
	```

## Dev servers:

- `http-server`: Ultra-simple, single command serves current directory

- `live-server`

- `webpack-server`: Hot reloading, serves from memory

- `browser-sync` : Dedicated IP for sharing on LAN, all interactions remains in sync,
	great for `cross device testing`, integrates with `webpack`, `gulp`, `browserify`

> `webpack` for big projects, `live-server` for small projects

### Backend Servers

- `express`, `koa`, `hafi`

- `nestJS` - express, typescript based backend framework for NodeJS

> express, nestJS

### Sharing work-in-progress

- `localtunnel`: Share in local machine, install the `npm` package and use it as
	```
	$ lt --port 3000

	# subdomain can be added too,
	$ lt -port 3000 --subdomain punith
	```

- `ngrok`: Secure tunnel to local machine, install `ngrok`, `authtoken`, and start the app

- `surge`: Quickly host static files to public URL, install

> localtunnel

### Automation

- `grunt`

- `gulp`: In memory streams, code over configuration,

#### npm scripts

- Declared in scripts section of the `package.json`, can leverage your OS command line,
	call separate node scripts, Convention based pre/post hooks, simpler debugging, no need for separate plugins

- Packages used in scripts sections are not required to be installed globally.
	```json
	"scripts": {
    "prestart": "node ./startMessage.js",
    "start": "node ./index.js",
    "security-check": "nsp check",
    "share": "lt --port 3000 --subdomain testdomain"
	}
	```

- Run user-defined scripts as follows
	```
	$ npm run security-check
	```

- Running concurrent tasks
	```json
	"scripts": {
	  "prestart": "node ./startMessage.js",
	  "start": "npm-run-all --parallel security-check open-source",
	  "open-source": "node ./index.js",
	  "security-check": "nsp check",
	  "localtunnel": "lt --port 3000 --subdomain punith",
	  "share": "npm-run-all --parallel open-source localtunnel"
	}
	```

- To silence the noise created in the command line, use
	```
	$ npm start -s
	```

> npm Scripts

## Transpilling

- `TypeScript`: Enhanced `autocomplete`, `readability`, safer refactoring, additional non-standard features.

- `Elm`: Compiles down to JS, clean syntax, immutable data structures, friendly errors,
	all errors are compile-time errors, interops with JS

- `Babel` - Write standardised JS, leverage full JS eco-system, use experimental features earlier,
	no type defs, annotations required, test, lint, great libs, safety, ES6 imports are statically analyzable

> Babel

## Bundling

- To bundle the JavaScript that the browsers can understand

- `webpack` - imports css, images etc like JS, built-in hot reloading web server, bundle splitting

> Webpack

## Linting:

- `Enforces consistency` - curly brace position, confirm/alert boxes in production code,
	trailing commas, declaring global variables, disallowing the usage of eval (potentially risky to use)

- `Avoids mistakes` - Extra parentheses, over writing a function, assignment in conditional,
	missing default case in switch, leaving debugger/console.log statements

- If any of this violated can fail the build while developing and deploying the code in production

- Linters to consider: `JSLint`, `JSHint`, `ESLint`

> ESLint

## Testing

### Testing Frameworks

- `mocha`, `jasmine` (has assertion library built in), `Tape` (Minimal configuration),
	`AVA` (runs impacted unit tests, new), `Jest`

> Mocha or Jest

### Assertion Library:

- Mocha doesn't have assertion library built

- `chai.js`, `should.js`, `expect.js`

> chai.js

### Helper Libraries

- `JSDOM` - Simulates the browser's dom - can run DOM related tests, without a browser

- `cheerio` - jQuery for the server, Query virtual DOM using jQuery selectors

## Test Runners Where to run tests:

- Browser: `karma`

- Headless Browsers: `PhantomJS`

- In memory DOM: `JSDOM`

> mocha + chai + jsdom

## Continuous integration:

- `Travis`
- `appveyor`
- `Jenkins`
- `CircleCI`
- `Semaphore`
- `snapCI`

> Travis or CicleCI

## HTTP clients to fetch

- Node supported: `http`, `request`

- Browser: `XMLHttpRequest(xhr)`, `jQuery`, `fetch`

- `Node and Browser`: `Axios`, `isomorphic-fetch`

- Mocking HTTP: `Nock`, `Static JSON`

- Create Developement server: `api-mock`, `JSON server`

- Declare schema: `JSON Schema Faker`

- Generate random data: `faker.js`, `chance.js`, `randexp.js`

- Serve data via API:  `JSON Server`

> Axios
