## Creating package.json:

- Initialize a npm project
```
$ npm init // asks series of questions, answer them to create package.json or
$ npm init -y // provide -y option to accept defaults
```

- Setting defaults
```
$ npm set init-author-name 'Punith K'
$ npm set init-author-email 'abc@abc.com'
```

- To delete a default settings
```
$ npm config delete init-author-name
$ ls ~/.npmrc // all config data stored here
```

- To install a package only for development and not for production use, `-D` or `--save-dev`
	flag while installing, it will put the package to `DevDependencies` section of the `package.json`
	```
	$ npm install --save-dev karma // karma is an testing library
	```

- Installing specific versions
```
$ npm install underscore@1.8.3 --save --save-exact
```
	-  To install the specific version of the package, also can specify `@1.8.x` to get the latest minor version, and '@">1.1.0  <1.4.0"' (can install 	1.3.0), can also use '||' operator within double quotes.

	-	`~` character before the version in the `package.json` gets the latest minor version of that package though we have specified any minor version in the package.json, for ex, "underscore" : "~1.5.1" - it gets the latest version 1.5.4
	-	`^` character before the version in the `package.json` gets the recent release of that package

	- `*` or `x` to get the latest version of that package.

### List all installed packages
```
$ npm ll -g --depth=0 // will return all installed global packages with information
$ npm home lodash // loades the home page of specified package
$ npm repo lodash // loads the repo of the specified package
```

#### Listing the packages:
```
$ npm list // Lists all the dependencies, pass '--depth=1' option to it to get the immediate dependencies of each dependencies.
$ npm list --global true // List the globally installed packages, can also add '--depth' flag to short the list.
$ npm list --depth 0 --long true // To get more details about the package, '--dev true' flag to list dev dependencies, '--prod true' flag to get production dependencies
```

#### Uninstall and remove a dependency from `package.json`
```
$ npm uninstall <package-name> --save (or)
$ npm rm/un/r <package-name> // add '-g' flag to uninstall the global package
```

#### Updating the packages - all in one go

- To discover new releases of the packages, you run
```
$ npm outdated
```

- To update to a new major version all the packages, install the `npm-check-updates` package globally
```
$ npm install -g npm-check-updates
// Run this command to update the list
$ ncu -u
$ npm update
$ npm install
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

- Updating npm itself:
```
$ npm install npm@latest -g // Make sure you run with administrator privilege, @beta can be specified to get if any beta versions exist
$ npm install -g npm@latest-3 // installs the latest npm version 3, in this case it gets 3.10.10
```

### Simple Scripts:
- Use scripts section to use default, test and start scripts
```json
"scripts" : {
	"test" : "node test.js",
	"start" : "node indrc.js",
	"uglify" : "uglify compress"
}
```

### Publish npm packages

- Commit and push your changes to git repo before Publishing

- Signup in npmjs.org, Add the user in command line using,
```
$ npm adduser // Prompts for username, password, and e-mail address

$ npm login // if you are already an user
```

- Create a git repo and set the project to reference to it, run `npm publish` to publish it
```
$ npm publish
```

- Create a `tag` for the version released in git repo, Update the package
```
$ npm version <patch/minor/major> // To update the appropriate version it commits and creates the tag for us, and publish it again
```

- Release a beta version
- Update the version as, 1.1.0-beta.0
- Push the changes to git, create a tag and publish it using,
```
$ npm publish --tag beta
```

- Removing `npm` from local cache & local folder of npm packages, from `C:/Users/<username>/AppData/Roaming/npm or npm-cache`
```
$ npm cache verify
```

### Useful commands
```
$ npm prune // to clean the packages, '--production' flag will remove the all dev dependencies
$ npm repo <package-name> // Take you to repository location of that package
```

## npm link - Making our module available locally

- Create the link for the dependency to be added to main project.
```
// Build the project before linking
$ npm link // on the root folder of util/project
```

- Link it to main project
```
$ npm link <package-name> // as mentioned in the package.json's name
```

#### Back to Normal from link

- When you don’t want to use the local version of `some-dep` anymore,
	delete the `symlink`. But careful, `npm unlink` is an alias for `npm uninstall`,
	it does not mirror the behavior of npm link.
	```
	$ cd ~/projects/my-app

	$ npm uninstall --no-save some-dep && npm install 	
	```

- You can clean up the global link, though its presence won’t interfere with my-app.
	```
	$ cd ~/projects/some-dep

	$ npm uninstall  # Delete global symlink
	```

## Check the bundle size with webpack

```
$ NODE_ENV=production webpack --config ./webpack.config.prod.js --profile --json > stats.json
```

- Need to install `webpack-cli` and `webpack-bundle-analyzer` globally
	then you run

```
$ webpack-bundle-analyzer stats.json`
```
