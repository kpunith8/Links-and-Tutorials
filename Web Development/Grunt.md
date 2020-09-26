
## Grunt - The JavaScript Task Runner

> The version and syntax used here might have been updated, this was written with
the grunt version 0.4.1 and other plugins used are from the same time. Please refer
the latest documentation and updated APIs to use it.

Task-based command line build tool for JavaScript projects which makes performing repetitive, but necessary, task trivial

Validates `css/html/JavaScript`

`Minify` or compress CSS/Javascript

Compile `CoffeeScript`, `TypeScript` etc.,

Compile `less` to `CSS`

### Files Required

`package.json` - metadata file which describes the project
```json
{
	"name" : "IntroductionToGrunt.js",
	"version" : "0.1.0",
	"devDependencies" : {
		"grunt" : "~0.4.1"
	}
}
```

`Gruntfile.js` to configure or define GRUNT tasks
```js
'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});
	uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
};
```

Run the task in command line as, `-v` means verbose logs
```
$ grunt taskName -v
```

## Installation

Install `Grunt CLI` globally to run tasks
```
$ npm install -g grunt-cli
```

Install grunt to be used in project
```
$ npm install grunt --save-dev
```

### Sample example

Clean the workspace before doing any other tasks, install `grunt-contrib-clean`
```
'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		clean: {
			output: ['ToBeCleaned/*']
		}
	)};

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('default', ['clean']);
}
```

Run the task as
```
$ grunt default -v // -v says verbose mode
```

> NOTE: All packages mentioned should have been updated and should have latest
APIs, make sure you use the latest and greatest versions with latest APIs

## Working with JavaScript

`grunt-contrib-jshint` - Validate JS with JSHint

`grunt-contrib-uglify` - Compressing JS with Uglify, mangling: feature to rename variables and
methods to meaningful names for development so that somebody can not interpret it easily.

`grunt-contrib-clean` - Cleaning folders and files

### Using JSHint

Load and register it in `Gruntfile.js`
```js
grunt.loadNpmTasks('grunt-contrib-jshint'); then add it to registerTask
grunt.registerTask('default', ['typescript', 'jshint']); -- these will run sequentially
```

Then add the following entry to `initConfig`,
```js
grunt.initConfig({
	jshint: {
		options: {
			force: true // It forcefully continues, can be removed when below options are set
			'-W069': false, // failure due to the way typescript works with enums
			'W0004': false, // failure due to typescript inheritance
			ignores: ['path/to/js-file-to-ignore'], // Can be a multiple files seperated by comma
			reporterOutput: './jshint.txt' // Writing these erros to output file
		},
		files: ['./www/js/*.js']
	},
});
```

### Using uglify

Load and register it in `Gruntfile.js`
```js
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask(default, ['typescript','uglify']);
```

Add this entry to `initConfig`
```js
grunt.initConfig({
	uglify: {
		development: {
			files: {
				'': ['']
				// which will compress one file in the root folder, multiple files can be added seperated by comma, or
				// The following files option can be used to scan the files as when they are added,
				files : [{
					expand: true,
					cwd: './www/js/',
					src: '**/*.js',
					dest: './www/js/'
				}]
			}
		},
		options: {
			mangle: false, // Keeps original variable names and method names intact
			compress: {
				drop_console: true // Which removes all the console.log() from the code, then compresses it
			},
			beautyfy: true // Helps in debugging the code, can be turned off before deploying
		}
	}
});
```

### Using clean

Load and register
```js
grunt.loadNpmTasks('grunt-contrib-clean');
// can be specified first, since we need clean up every time building it freshly
grunt.registerTask(default, ['clean', 'typescript','uglify']); 	
```

Add this entry to `initConfig`
```js
grunt.initConfig({
	clean: {
	options: {

	},
	files: ['file/to/to/be/removed'],
	folders: ['folder/to/remove']
	}
});
```

A single task can be specified in the grunt command line, so that we can have
control over the execution, for eg:
```
$ grunt clean

# and with options
$ grunt clean:folders
```

## Working with HTML and CSS:

`grunt-contrib-htmlmin` - Compress HTML, remove html comments, collapse white-space
and tags, removes redundant tag elements

`grunt-htmllhint` - Validates HTML, ensure unique tag id's, ensure valid attributes, tags are correct and valid

`grunt-contrib-less` -Convert less to css with less, modify less variables, compress

`grunt-contrib-csslint` -	Validates CSS, configure rules, use external config file

`grunt-contrib-cssmin` - Compress CSS, compress, minify single/mutiple or concat to one file

### Using html and css pre-processing as grunt tasks

Add these entries to, `initConfig`
```js
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	htmlhint: {
		templates: {
			options: {
				'attr-lower-case': true,
				'attr-value-not-empty': true,
				'tag-pair': true,
				'tag-self-close': true,
				'tagname-lowercase':true,
				'id-class-value': true,
				'id-class-unique': true,
				'src-not-empty': true,
				'img-alt-required': true
			},
			src: ['www/**/*.html']
		}
	},
	htmlmin: {
		dev: {
			options: {
				removeEmptyAttributes: true,
				removeEmptyElements: true,
				removeRedundantAttributes: true,
				removeComments: true,
				removeOptionalTags: true,
				collapseWhitespace: true
			},
			files: {
				'www/template/sample.min.html' : ['www/template/sample.html']
				// The following files option can be used to scan the files as when they are added,
				files : [{
					expand: true,
					cwd: './www/html/',
					dest: './www/html/',
					src: '[*.html]',
					ext: '.min.html',
					extDot: 'last'
				}]
			}
		}
	},
	less: {
		development: {
			options: {
				cleancss: true,
				compress: true,
				modifyVars: {
					"color-primary-dark-value": "NOT_BLUE" // value in a less file modified
				}
			},
			files: { "www/css/main.css" : "www/css/main.less" }
			// Or the following array files can be passed to scan the files as when they are added
			files : [{
				expand: true,
				cwd: './www/css/',
				dest: './www/css/',
				src: '[*.less]',
				ext: '.css',
				extDot: 'last'
			}]
		}
	},
	csslint: {
		strict: {
			options: {
				// options if you have some
			},
			src: ['www/css/sample.css']
		},
		laxed: { // run laxed under csslint as follows, grunt csslint:laxed
			options: {
				'zero-units': false // passing external source as options can be done using,
				csslintrc : 'lintrules.json'
			},
			src: ['www/css/sample.css']
		}
	},
	cssmin: {
		min: {
			options: {
				"report": "gzip"
			},
			files: {
				'www/css/sample.min.css': ['www/css/sample.css']
			}
		}
		// To use minify multiple files dynamically, use minify property rather than min option under cssmin (remove min property)
		minify: {
			expand: true,
			cwd: './www/css/',
			dest: './www/css/',
			src: ["*.css", "!*.min.css"], // To not to already minified files, negate the file extension
			ext: '.min.css',
			extDot: 'last'
		},
		// To create one minified css file
		concat: {
			options: {
				// options
			},
			files: {
				'www/css/sample.min.css': ['www/css/*.css']
			}
		}
	},
});
```

## Advanced grunt - Custom plugins

### Custom inline tasks: Register the task to create a custom task

Use `grunt.registerTask` - requires name and description, invoked via callback,
can access external variables and libraries, can accept arguments in the callback
```js
var fs = require('fs');

grunt.registerTask('checkFileSize', 'Check the file size', function(debug) {
	var options =  this.options({
			folderToScan: '';
		});

	if(this.args.length !== 0 && debug !== undefined) {
		grunt.log.writeflags(options, 'Options');
	}

	grunt.file.recurse(options.folderToScan, function(absPath, rootDir, subDir, filename) {
		if(grunt.file.isFile(absPath)) {
			var stats = fs.statSync(absPath); // fs is part of nodejs to work with file system
			var asBytes = stats.size / 1024;
			grunt.log.writeln("Found file %s with size of %s kb", filename, asBytes);
		}
	});
});
```

To make custom tasks work like a normal grunt task
```js
grunt.initConfig ({
	checkFileSize: {
		options: {
			folderToScan: './files';
		}
	}
});
```

Providing arguments to task, add debug parameter to `checkFileSize()` function and
check it's populated.	Arguments can be passed as,
```
$ grunt checkFileSize:true
```

### Create a Custom Plugin

Clone `gruntplugin` to local as specified above and run
```
$ grunt-init gruntplugin
```			
Asks few questions, answer them, which creates the folder structure and required files for an plugin

It creates a `CheckFileSize.js`, add the following code,
```js
'use strict';

module.exports = function(grunt) {
		grunt.registerTask('checkFileSize', 'Task to check the file size', function() {
		var options =  this.options({
				folderToScan: '',
				debug: false
			});

		if(debug !== undefined) {
			grunt.log.writeflags(options, 'Options');
		}

		grunt.file.recurse(options.folderToScan, function(absPath, rootDir, subDir, filename) {
			if(grunt.file.isFile(absAath)) {
				var stats = fs.statSync(absPath);
				var asBytes = stats.size / 1024;
				grunt.log.writeln("Found file %s with size of %s kb", filename, asBytes);
			}
		});
	});
}
```

To use plugin, update the configuration file, `GruntFile.js`
```js
CheckFileSize: {
	options: {
		folderToScan: './files',
		debug: true					
	}
},

// Loads this plugin's tasks
grunt.loadTasks('tasks');
```

Install the package before using it, run,
```
$ npm install
```

Publish the plugin to npm and make it public
