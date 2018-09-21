# Node.js - Addision Wesley

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

// Prototypal inheritance
function Shape() {
  this.x = 0;
  this.y = 0;

  this.move = function(x, y) {
    this.x = x;
    this.y = y;
  }
}

function Square() {
}

Square.prototype = new Shape();
Square.prototype.__proto__ = Shape.prototype;
Square.prototype.width = 0;

Square.prototype.area = function() {
  return this.width * this.width;
}

let square = new Square();
sq.move(15, 15);
sq.width = 15;
console.log('ares of sqaure', sq.area());
```

- Node.js globals
  - global object
  - process object  

- Synchronous and async programming

```javascript
// Async programming
// setTimeout(() => {
//   console.log('Running after 2 seconds');
// }, 2000); // can be changed to any number, in milliseconds, 1000 - for 1 second

// console.log('waiting for job to complete');

// Reading file asynchronously
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
    // This is to solve this reference after calling asnyc calls, also can be solved using arrow functions
    // let self = this;
    console.log('About to open:', this.fileName);

    fs.open(this.fileName, 'r', (err, handle) => { // use arrow functions, =>
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
- First add the user in command line `npm adduser`, once user created publish the package using `npm publish`, make sure `private` property is removed in the  `package.json`

# Advanced node: Samer Buna - Plural sight:

## Architecture:
- To check the process version of v8
```javascript
$ node -p 'process.verisons.v8'
```
```javascript
$ node --harmony // will load staged feature of the node
```
- To select in progress node features
```javascript
$ node --v8-options | grep "in progress"`
```
- To get V8 options
```javascript
$ node
> V8
> V8.getHeapStatistics() // will return memory usage
```
- Node has libuv - C library - used to abstract non-io blocking operations, it handles child processes, TCP/UDP sockets, file system
includes thread pool to handle async operations, provides event loop

- Node has http-parser, c-ares - async DNS queries, OpenSSL, zlib - async streaming, compression interfaces

## CLI and REPL:
- Tab on empty empty node console brings all possible options available in node
```javascript
> node // type it to enter the REPL mode - Read Eval Print Loop
> var arr = [];
undefined
>arr.<tab> // which brings available operations on array
> _ // remembers the last evaluated value.
> .<tab> // brings the special variables associated with node, for ex: `.break, .clear, .help, .load, .editor, .save`
$ node -c sample.js // checks for bad syntax in the source file, -r option used to preload modules
$ node -p "process.argv.slice(1)" test 42 // parameters are passed after process keyword added
// it prints ['test', '42'] as strings
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

## Global Object, Process, and Buffer:
```javascript
$ node -p "process.versions" // prints current node and all of its dependencies and their versions
$ node -p "process.env" // lists all environment variables set in the operating system,
// which is `set` command in windows
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
  > 0xE2 // prints nothing with String decoder
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
Can be executed as either from being required or from the command line using,
`$ npm print.js 5 Hello`

- Event Loop - En entity that handles external events and converts them to callback invocations.

## Event Emitters:
- Sample usage
```javascirpt
const EventEmitter = require('events');
 class Logger extends EventEmitter {
 }

 const logger = new Logger();
 logger.emit('event'); // Any named event can be emitted

 logger.on('event', listenerFunction);
```
