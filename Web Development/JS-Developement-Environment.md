## Building a JavaScript Environment: Cory House

- ember - fully opinionated library

### Editor Selection

	VSCode - JavaScript editor, other options - atom

	EditorConfig - helps create a config for a editor

		Install the plugin before using in VS code, goto, editorconfig.org -> download the plugin -> copy the command and open VS code, 'Ctrl + SHift + p' to open the command pallate and paste the command and select to install

		Create .editorconfig file in the project root.

### Package managers

	Use 'node security platform' to check for package vulnerabilities, install it using,

	$ npm instal --global nsp

	Run this to check, using,

	$ nsp check

 Dev servers:

	http-server : Ultra-simple, single command serves current directory
	live-server
	express, koa, hafi
	budo
	webpack-server : hot reloading, serves from memory
	browserSync : dedicated IP for sharing on LAN, all interactions remains in sync, great for cross device testing, integrates with webpack, gulp, browserify

	Consider: express

### Sharing work-in-progress

	- localtunnel : share in local machine, install using npm, start the app then run using,

		usage: $ lt --port 3000

	- ngrok : secure tunnel to local machine, install ngrok, install authtoken, start the app

		usage: $ ./ngrok http 80

	  now : install, create the start script,

		usage: $ now

	- surge : Quickly host static files to public URL, install

		usage: $ surge

	- Consider: localtunnel; usage: $ lt --port 3000

		Add, --subdomain option to include custom subdomain in the url; usage: $ lt -port 3000 --subdomain punith // Will give link as follows, https://punith.localtunnel.me

### Automation

	grunt

gulp : in memory streams, code over configuration,

	- npm scripts : declared in scripts section of the package.json, can leverage your OS command line, call separate node scripts, Convention based pre/post hooks, simpler debugging, no need for separate plugins

	- add rules to scripts section in package.json

	- packages used in scripts sections are not required to be installed globally.

		"scripts": {
		    "prestart": "node ./startMessage.js",
		    "start": "node ./index.js",
		    "security-check": "nsp check",
		    "share": "lt --port 3000 --subdomain punith"
	  	},

  - Run user-defined scripts as follows,

  		$ npm run security-check

  - Running concurrent tasks,

  	"scripts": {
	    "prestart": "node ./startMessage.js",
	    "start": "npm-run-all --parallel security-check open-source",
	    "open-source": "node ./index.js",
	    "security-check": "nsp check",
	    "localtunnel": "lt --port 3000 --subdomain punith",
	    "share": "npm-run-all --parallel open-source localtunnel"
  	},

  - To silence the noise created in the command line, use

  		$ npm start -s // option to reduce the noise

# Transpilling:

	- TypeScript : Enhanced autocomplete, readability, safer refactoring, additional non-standard features.

	- Elm : compiles down to js, clean syntax, immutable data structures, friendly erros, all errors are compile-time erros, interops with JS -> Deep learing curve required to adopt this

	- Babel : write standardized JS, leverage full JS eco system, use experimental features earlier, no type defs, annotations required, test, lint, great libs, safety, ES6 imports are statically analyzable

		it offers two ways to configure:

		package.json : place it in a section called "babel" : { },

		.babelrc : Recommended - keep it in project root folder, not npm specific

		- compile using $ babel-node <file-name.js>

# Bundling:

	- To bundle the JavaScript that the browsers can understand

	- webpack - import css, images etc like JS, built-in hot reloading web server, bundle splitting

	- webpack.config.js file in the root folder required.

	- To use it in node.js app, add the following,

		import webpack from 'webpack';
		import config from './webpack.config';

		const compiler = webpack(config);

		// Required to run webpack in express
		app.use(require('webpack-dev-middleware')(compiler, {
		    publicPath: config.output.publicPath
		}));


# Linting:

	- Enforces consistency - curly brace position, confirm/alert boxes in production code, trailing commas, declaring global variables, disallowing the usage of eval (potentially risky to use)

	- Avoids mistakes - Extra paranthesis, overwritng a function, assignment in conditional, missing default case in switch, leaving debugger/console.log statements

	- If any of this violated can fail the build while developing and deploying the code in production

	- Linters to consider: JSLint, JS Hint, ES Lint

	- Consider ES Lint - TS Lint supports the type script (consider if working on Type script)

	- Can be configured in package.json or create .eslintrc.json file in the project root folder

	- eslintConfig section can be added in package.json

	- @ github.com/dustinspecker/awesome-eslint - to get the available plugins for different JavaScript frameworks

	- Use a preset - ES lint recommended list or start from scrath which fits the team standards or airbnb, standardjs presets

	# Downsides:

		- ESLint doesn't watch files, To watch files use (Upon save)

			- eslint-loader (if using webpack) - re-lints all files upon save
			- eslint-watch - ESLint wrapper that adds the file watch - not tied to webpack, better warning/error formatting, displays clean message, easily lint tests and build scripts

		- Doesn't support experimental JavaScript features, to use experimental features use,

			- babel-eslint

	# Need eslint, eslint-watch, eslint-plugin-import plugins to make it work.

	- create a script in package.json as,

		"lint": "esw webpack.config.* src --color" // esw; eslist-watch executable which looks for config file and in src folder, folders can be specified by leaving a space

		run it as; $ npm run lint

	- To disable a lint in a file, use the following comment in file,
	```javascript
		/* eslint-disable no-console */
	```
	- To disable in lint in a source code, use the following,

		// eslint-disable-line no-console

	- To watch the files use the following,

		 "lint:watch": "npm run lint -- --watch" -> run it as; $ npm run lint:watch, add the lint:watch to start script of npm

# Testing and Continuous integration:

	- Testing Framework:

		mocha, jasmine (has assertion library built in), Tape (Minimal configuration), AVA (runs impacted unit tests, new), Jest (from facebook - popular for react developers - wrapper over Jasmine) - Consider -> Mocha

	- Assertion Library: Mocha doesn't have assertion library built

		chai.js, should.js, expect.js - Consider -> chai.js

	- Helper Library:

		JSDOM - simulate the browser's dom - can run DOM related tests, without a browser
		cheerio - jQuery for the server, Query virtual DOM using jQuery selectors

	- Where to run tests:

		Browser: karma, Testem
		Headless Browsers: PhantomJS - has no visible interface
		In memory DOM: JSDOM - 9.8.0 used in the project

	- mocha + chai + jsdom(9.8.0)

		add this in scripts section of package.json
		```
		"test": "mocha --reporter progress src/testSetup.js \"src/**/*.test.js\""
		```

### Continuous integration:

	- travis: Linux based
	- appveyor: window based
	- Jenkins
	- circleCI
	- Semaphore
	- snapCI

	- travis

### HTTP Calls:

	- Node: http, request
	- Browser: XMLHttpRequest(xhr), jQuery, Fetch
	- Node and Browser: isomorphic-fetch, xhr, SuperAgent, Axios

	Demo: Fetch

	- Mocking HTTP:

		Nock - to mock http calls
		Static JSON
		Create developement server: api-mock, JSON server, JSON schema faker (To use dynamic data)

	- Declare schema: JSON Schema Faker
	- Generate random data: faker.js, chance.js, randexp.js
	- Serve data via API:  JSON Server

### Production build:

	- Minification: Speeding page loads, saving bandwidth
		- Shortens variable names and funciton names, removes comments, removes white spaces and new lines
		- tree shaking / dead code elimination (webpack does this)
