## Creating package.json:

Initialize a npm project
```
$ npm init ## asks series of questions, answer them to create package.json or

$ npm init -y ## supply -y option to accept defaults
```

Setting defaults
```
$ npm set init-author-name 'Punith K'

$ npm set init-author-email 'abc@abc.com'
```

Delete the default settings
```
$ npm config delete init-author-name

$ ls ~/.npmrc ## config data store
```

Install a package only for development and not for production use, `-D` or `--save-dev`
flag while installing, it will put the package to `DevDependencies` section of the `package.json`
```
$ npm install --save-dev karma
```

Installing specific versions
```
$ npm install underscore@1.8.3 --save --save-exact
```

To install the specific version of the package, also can specify `@1.8.x` to get the latest minor version, and '@">1.1.0  <1.4.0"' (can install 	1.3.0), can also use '||' operator within double quotes.

`~` character before the version in the `package.json` gets the latest minor version of that package though we have specified any minor version in the package.json, for ex, "underscore" : "~1.5.1" - it gets the latest version 1.5.4

`^` character before the version in the `package.json` gets the recent release of that package

`*` or `x` to get the latest version of that package.

### List all installed packages

```
$ npm ll -g --depth=0 ## will return all installed global packages with information

$ npm home lodash ## loades the home page of specified package

$ npm repo lodash ## loads the repo of the specified package
```

### Listing the packages

```
$ npm list ## Lists all the dependencies, pass '--depth=1' option to it to get the immediate dependencies of each dependencies.

$ npm list --global true ## List the globally installed packages, can also add '--depth' flag to short the list.

$ npm list --depth 0 --long true ## To get more details about the package, '--dev true' flag to list dev dependencies, '--prod true' flag to get production dependencies
```

#### Uninstall and remove a dependency from `package.json`

```
$ npm uninstall <package-name> --save (or)

$ npm rm/un/r <package-name> ## add '-g' flag to uninstall the global package
```

#### Installing from git repo and gist

```
$ npm install <path-to-git/path-to-custom-url>
$ npm install gist:<gist-hash> --save
```

#### Installing from a folder

```
$ npm install <path-to-network/local-folder>
```

### Updating npm itself

```
$ npm install npm@latest -g ## Make sure you run with administrator privilege, @beta can be specified to get if any beta versions exist

$ npm install -g npm@latest-3 ## installs the latest npm version 3, in this case it gets 3.10.10
```

### Sample scripts

- Use scripts section to use default, test and start scripts
```json
"scripts" : {
	"test" : "node test.js",
	"start" : "node indrc.js",
	"uglify" : "uglify compress"
}
```

### Publish npm packages

Commit and push your changes to git repo before Publishing

Signup in npmjs.org, Add the user in command line using,
```
$ npm adduser ## Prompts for username, password, and e-mail address

$ npm login ## if you are already have an account with npm
```

Create a git repo and set the project to reference to it, run `npm publish` to publish it
```
$ npm publish
```

Create a `tag` for the version released in git repo, Update the package
```
$ npm version <patch/minor/major> ## To update the appropriate version it commits and creates the tag for us, and publish it again
```

### Release a beta version

Update the version as, 1.1.0-beta.0

Push the changes to git, create a tag and publish it using
```
$ npm publish --tag beta
```

Removing `npm` from local cache & local folder of npm packages, from `C:/Users/<username>/AppData/Roaming/npm or npm-cache`
```
$ npm cache verify
```

## npm link - For local developement

Create the link for the dependency to be added to main project.
Build the project before linking
```
$ npm run build

$ npm link ## on the root folder of util/project
```
> If you have multiple versions of node running in your system, check the output
it shows where the node module installed, make sure dependent project uses the same version while installing.

Link it to main app, package name should be same as that of one in `package.json`
```
$ npm link <package-name>
```

### Back to normal from link once development is done

When you don’t want to use the local version of `some-dep` anymore,
delete the `symlink`. But careful, `npm unlink` is an alias for `npm uninstall`,
it does not mirror the behavior of npm link.
First uninstall it from the `main-app`
```
$ npm uninstall --no-save <package-name> && npm install 	
```

You need clean up the global link created for depended one
```
$ npm uninstall
```

## Updating all npm packages at once

To discover new releases of the packages, run
```
$ npm outdated
```

To update to a new major version all the packages, install the `npm-check-updates` package globally
```
$ npm install -g npm-check-updates

# Run this command to update the list
$ ncu -u

$ npm update

$ npm install
```

## Remove node_modules across the system in Mac

```
$ find / -name node_modules | xargs rm -rf
```

## NVM - Node versioning manager

After copying the script in `Mac` update the `.zshrc` or `.bashrc` and
run this command to take an effect
```
$ source ~/.zshrc
```

nvm usage
```
$ nvm install 8.0.0                     # Install a specific version number

$ nvm use 8.0                           # Use the latest available 8.0.x release

$ nvm run 6.10.3 app.js                 # Run app.js using node 6.10.3

$ nvm exec 4.8.3 node app.js            # Run `node app.js` with the PATH pointing to node 4.8.3

$ nvm alias default 8.1.0               # Set default node version on a shell

$ nvm alias default node                # Always default to the latest available node version on a shell
```

## npx package runner

Temporarily install and invoke a package from `npm`

Fun example
```
$ npx devpun -t react | npx cowsay -f vader | npx lolcatjs
```

### Executing the code with different node version

```
$ npx -p node@12.0 -- node index.js
```

### Execute the code in a github branch with npx

```
$ npx kpunith8/repo#branch-name
```

### Execute gist with npx

Create n gist adding `index.js` file with any JS code
```js
#!/usr/bin/env node

console.log(`Hello there, I'm inside the gist`)
```

Create a `package.json` file in the same gist with following content
```json
{
	"name": "js-from-terminal-with-npx",
	"version": "1.0.0",
	"bin": "./index.js"
}
```

Execute using npx
```
$ npx <url-to-gist>
```

## Other Commands

### prune

```
$ npm prune ## to clean the packages, '--production' flag will remove the all dev dependencies
```

### Access the git repo of that package

```
$ npm repo <package-name> ## Takes you to repository location of that package
```

### Check the latest or all the versions in the npm

```
## Try without version(s) to get more info about the repo
$ npm v/show/info create-react-app version(s)
```

### Install multiple packages starting with the same name space

```
## -s to keep the log silent

$ npm i babel{-cli, -preset-env, -plugin-transform-object-rest-spread} -Ds
```

### Find the env variables of npm

Use `$npm_package_version` while bundling the code
```
$ npm run env | grep npm_

"build": "babel index.js -d lib/$npm_package_version" ## Creates the transfiled code into lib/12.0/index.js
```

## Check the bundle size with webpack

Install `webpack-cli` and `webpack-bundle-analyzer` globally, and run
```
$ NODE_ENV=production webpack --config ./webpack.config.prod.js --profile --json > stats.json

$ webpack-bundle-analyzer stats.json`
```

## Issues and Fixes

### Error installing npm modules in macOS Catalina

```
gyp: No Xcode or CLT version detected!
gyp ERR! configure error
```

Get the location of the installed command-line tools by running the command below:
```
$ xcode-select --print-path
```
It prints, `/Library/Developer/CommandLineTools`

Delete all the files in the directory
```
$ sudo rm -r -f /Library/Developer/CommandLineTools
```

Install the command lines tool again
```
$ xcode-select --install
```
Accept the security warning and install it
