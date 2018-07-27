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

$ 
```


# Advanced node: Samer Buna - Plural sight:

## Architecture:
- To check the process version of v8
```javascript
$ node -p 'process.verisons.v8'
```
```javascript
$ node --harmony // will load staged feature of the node`
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
