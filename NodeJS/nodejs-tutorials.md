## Node.js - Basics

```javascript
$ node debug server.js // Opens the file in debug mode

$ isFinite(2323.44); // returns true

$ isNaN(parseInt("asdf")); // returns true, parses string to a integer

$ 5 + 3 + "some text"; // returns '8 some text'

$ "" + 5 + 3 + "some text"; // returns '53 some text'

$ /[aA]{2,}/; // considers it as regular expression, it can also be created using

$ new RegExp("[aA]{2,}");

$ "aaoo".search(/[aA]{2,}/); // searches for 2 or more a's in the given string, returns 0

$ Object.keys(user).length; // returns the number of keys in user object

let arr = ['cat', 'mat', 'bat'];
arr[10] = 'rat';

// Though it has empty elements from index 3 to 10 it prints as empty elements with 7 empty items
console.log('Lenght of array,', arr.length, ' and has,', arr);

// It deletes the item in the array and leave the index undefined
console.log('Remove mat from array,', delete arr[1], ', After deleting,', arr);

// use splice() to deletes the item and re-arrange the index
console.log('Remove 2 items from the array,', arr.splice(1, 2)); // starting from index 1 and removes 2 items

// unshift() adds items at the begining and shift() removes from the begining
// pop() - pops from the end of an array and push() - pushes items at the end
```

- Node.js globals
  - global object
  - process object  

- Synchronous and async programming

  ```javascript
   setTimeout(() => {
     console.log('Running after 2 seconds');
   }, 2000); //in milliseconds, 1000 - for 1 second

  console.log('waiting for job to complete');

  // Reading files asynchronously
  var fs = require('fs');
  var buf = new Buffer.alloc(100000);

  fs.open('test.txt', 'r', (err, handle) => {
    fs.read(handle, buf, 0, 100000, null, (err, length) => {
      console.log(buf.toString('utf-8', 0, length));
      fs.close(handle, () => { });
    });
  });

  // understanding this, returning call backs from a function
  function FileObject() {
    this.fileName = '';

    // callback(err, boolean)
    this.fileExists = function (callback) {
      // This is to solve this reference after calling async calls, also can be solved using arrow functions
      // let self = this;
      console.log('About to open:', this.fileName);

      fs.open(this.fileName, 'r', (err, handle) => {
        // use arrow functions
        if (err) {
          console.log('Can\'t open:', this.fileName);
          callback(err);
          return;
        }

        fs.close(handle, () => { });
        callback(null, true);
      });
    }
  }

  let fileObject = new FileObject();
  fileObject.fileName = 'test txt';
  fileObject.fileExists((err, exists) => {
    if (err) {
      console.log('Error openening file:', JSON.stringify(err));
    } else {
      console.log('File exists:', exists);
    }
  });
  ```

### Create a node package in local system

- Project should have `package.json` with the following details
  ```javascript
  'name': 'Sample Project',
  'description': 'Description of the project',
  'version': '1.0.0',
  'main': 'lib/index.js',
  'private': true
  ```
- `npm link .` will create link to the package in local

- To use it in any project run this command `npm link <package-name>` in the root folder where the package is required.

### Publish npm package to npm registry

- First add the user in command line `npm adduser`, once the user created publish the package using `npm publish`, make sure `private` property is removed in the  `package.json`

## Advanced nodeJS: Samer Buna

### Architecture

- To check the process version of v8
  ```javascript
  $ node -p 'process.verisons.v8'
  ```
  ```javascript
  $ node --harmony // will load staged feature of the node
  ```

- To select in progress node features
  ```javascript
  $ node --v8-options | grep "in progress"
  ```

- To get V8 options
  ```javascript
  $ node
  > V8
  > V8.getHeapStatistics() // will return memory usage
  ```

- Node has `libuv` - C library - used to abstract non-io blocking operations, it handles child processes, TCP/UDP sockets, file system
includes thread pool to handle async operations, provides event loop

- Node has `http-parser`,` c-ares` - async DNS queries, `OpenSSL`, `zlib` - async streaming, compression interfaces

### CLI and REPL

- Tab on empty empty node console brings all possible options available in node
  ```javascript
  // type it to enter the REPL mode - Read Eval Print Loop
  $node
  $var arr = [];
  undefined

  // brings available operations on array
  $arr.<tab>

  // remembers the last evaluated value.
  $_

  // brings the special variables associated with node
  $.<tab>  
  // for ex: .break, .clear, .help, .load, .editor, .save

  // checks for bad syntax in the source file,
  $node -c sample.js  // -r option used to preload modules

  // parameters are passed after process keyword added
  $node -p "process.argv.slice(1)" test 42
  // it prints ['test', '42'] as strings

	`Ctrl+L` - to clear the session and clear the command line

	// Editor to code in command line
	$.editor

	// Get the help
	$.help

	// Save the content typed in REPL session to a file
	$.save <file-name.js>

	// Load the saved file using
	$.load <file-name.js>
  ```

- Creating custom REPL
```javascript
const repl = require('repl');
let r = repl.start({
    ignoreUndefined: true,
    replMode: repl.REPL_MODE_STRICT
	});
// If you want add lodash to global context, which preloads the lodash
r.context.lodash = require('lodash');
```

## Global Object, Process, and Buffer

```javascript
$ node -p "process.versions" // prints current node and all of its dependencies and their versions
$ node -p "process.env" // lists all environment variables set in the operating system,
// which is set command in windows
```

- Buffer - is to work with binary streams of data
- Chuck of data allocated outside of V8
  ```javascript
  const { StringDecoder } = require('string_decoder');
  const decoder = new StringDecoder('utf-8');
  process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk != null) {
        const buffer = Buffer.from([chunk]);

        console.log('With .toString()', buffer.toString());
        console.log('With StringDecoder', decoder.write(buffer));
      }
  });

  $ node filename.js
  0xE2 // prints nothing with String decoder
  > 0xAC // prints euro symbol
  ```

- `arguments` will have all the arguments in the source file, console.log() them to see

- Identify whether a source can be run as script or required in other files use `require.main === module`.
  ```javascript
  // print.js
  const print = (stars, header) => {
      console.log('*'.repeat(stars));
      console.log(header);
      console.log('*'.repeat(stars));
  };
  if (require.main === module)
  {
      // Accepts the command line arguments and pass it to the print function as script.
      print(process.argv[2], process.argv[3]);
  } else {
      // export the module if it can be required by other files
      module.exports = print;
  }
  ```
  Can be executed as either from being required or from the command line using, `$ npm print.js 5 Hello`

- Event Loop - An entity that handles external events and converts them to callback invocations.

### Event Emitters
- Sample usage
  ```javascript
  const EventEmitter = require('events');
  class Logger extends EventEmitter {
  }
  const logger = new Logger();
  logger.emit('event'); // Any named event can be emitted

  logger.on('event', listenerFunction);
  ```

### Common built-in libraries

### os module

- `> os.` hit tab to auto complete all possible methods available. Usage: for eg: `os.freemem()` to display free memory and `os.type()`
to disply the type of Operating System.

### fs module

- Has both synchronous and asynchronous flavors on all methods
  ```javascript
  const fs = require('fs');

  // Asynchronous form
  fs.readFile(__filename, (err, data) => {
    if (err) throw error;

    // do something with the data
  });

  // Synchronous form
  const data = fs.readFileSync(__filename);
  // Exceptions are thrown immediately
  // do something with data
  ```
  ```javascript
  const fs = require('fs');
  const path = require('path');

  // Get the directory name
  const dirname = path.join(__dirname, 'files');

  // Reads all the files in the folder
  const files = fs.readdirSync(dirname);

  files.forEach(file => {
    const filePath = path.join(dirname, file);

    // Gets the status of the file
    fs.stat(filePath, (err, stats) => {
      if (err) throw error;
      fs.truncate(filePath, stats.size/2, err => {
        if (err) throw err;
      });
    });
  });
  ```

- use `util` module to deprecate, format, do many more, check the list of items in node console

### Debugging

- debug an node file using, `node debug file.js` it opens debugger in node REPL, type `help` to get the available options
  to debug

- use `sb(2)` function to set the break point, it sets break point at line 2.

- type `restart` to restart the debugging, if the debugger was stopped.

- use `cont` to continue the script in debug mode, once it stops at line 2, type `repl` to enter the debug REPL mode
  to inspect the values, type variable name or object name to print the values at that point `eg`: args

- If the break point is in a loop, use `watch()` expressions to watch on particular values, instead of
  hitting the break points three times `eg:` `watch('arg')` `watch('total')` to watch 2 values in a loop,
  type `cont` to see watchers set

- To launch it in chrome dev tools, run the following command, `node --inspect --debug-brk index.js`, it gives an url copy the
  url and paste it in chrome to debug


### Streams

- Collections of data that might not be available all at once and don't have to fit in memory.

- 4 types of Streams
  - Readable - `fs.createReadStream`
  - Writable - `fs.createWriteStream`
  - Duplex - `net.Socket`
  - Transform - `zlib.createGzip`

- All streams are instance of `EventEmitters`

- streams can also piped using `pipe()` function `eg:` `src.pipe(dest)`, use either pipes or events, don't mix them

- Writable stream example
  ```javascript
  // It just echos the text typed in
  const { Writable } = require('stream');

  const outStream = new Writable({
    write(chunk, encoding, callback) {
      console.log(chunk.toString());
      callback();
    }
  });

  // streams can be piped using, process.stdin's pipe()
  process.stdin.pipe(outStream);

  // It also can be written as
  // process.stdin.pipe(process.stdout);
  ```

- Readable stream example
  ```javascript
  const { Readable } = require('stream');

  const intStream = new Readable({
    read(size) {
      this.push(String.fromCharCode(this.currentCharCode++));

      if (this.currentCharCode > 90) { // char code for z
        this.push(null);
      }
    }
  });

  intStream.currentCharCode = 65;

  //intStream.push('ABSSKSKSKS');
  // signals the input stream to end
  //intStream.push(null);

  intStream.pipe(process.stdout);
  ```

  - `process.stdout.on('error', process.exit)` - to exit the `stdout` on error

- Duplex needs to implement both `read()` and `write()` functions

- Transform stream example using `zlib.createGzip()`
  ```javascript
  const fs = require('fs');
  const zlib = require('zlib');
  const file = process.argv[2];

  fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .on('data', () => console.log('.')) // To give progress info on data event
    .pipe(fs.createWriteStream(`${file}.gz`))
    .on('finish', () => console.log('Done')); // To print done on finish event

  // Pass file-name as second parameter in command line
  // $ node zip.js file.txt
  ```

### Using curl

- To make a get request
	`$curl http://localhost:8080`

- Upload a file
	`$curl -F 'data=@path/file-path/name' http://localhost:8080` or `$curl --upload-file <path-of-the-file> http://localhost:8080`

- Upload multiple files
	`$curl -F 'fileX=@path/file-name' -F 'fileY=@path/filename' http://localhost:8080`


## Generate random hexa decimal string for secret keys from command line
```
$ node
> require('crypto').randomBytes(64).toString('hex')
```

### References

- http://www.stripe.com - for Web and mobile payments
