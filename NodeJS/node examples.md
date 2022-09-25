## Node examples and utility methods

Helper method to get the root directory where the node's main module runs
```js
const path = require('path');

const rootDir = path.dirname(process.mainModule.filename);

// Pass it to path.join() to construct a absolute path
// instead of __dirname use rootDir 
path.join(rootDir, 'views', '404.html')
```


## TIL connecting to "localhost:0" allows the kernel pick an open port for you 


## Parse command line args and store it as flags if passed with -a or --add

```js
const flags = []
process.argv.forEach(arg => {
  if (/^-/.test(arg)) {
    flags.push(arg.replaceAll('-', ''))
  }
})

if (flags.includes('a') || flags.includes('add')) {
  // prompt for question input
}
```

Example of passing a arg to the node script
```shell
$ node index.js --add
```

`readline` node's internal package to read input from command line 
```js
import readline from 'node:readline'

const rl = readline.createInterface({
  terminal: true,
  input: process.stdin,
  output: process.stdout
})

console.log("What's your name:")

let input = ''

rl.input.on('keypress', (value, rl) => {
  // check whether return(enter) key pressed after entering the input
  if (rl.name === 'return') {
    console.log(`Your name is ${input}`)
  } else {
    input += value
  }
})
```

Using the `readline promises API`
```js
import readline from "node:readline/promises";

const rl = readline.createInterface({
  terminal: true,
  input: process.stdin,
  output: process.stdin,
});

const name = await rl.question("What is your name?");
console.log(`Your name is ${name}.`);

const place = await rl.question("Where do you live?");
console.log(`You live in ${place}.`);

// Don't close the rl, to listen for more input
rl.close();
```

Third part library to do parse the command line args 
- `inquirer` 
- `commander`
- `caporal` - coloured input
- `yargs`

Using `inquirer` to parse and ask questions
```js
// for mac - to execute this file without using node index.js always
#! /usr/bin/env node 
// #! /usr/bin/env/node on linux
import inquirer from 'inquirer'

if (flags.includes("a") || flags.includes("add")) {
  // addQuestion()
} else {
  askQuestion()
}

async function askQuestion() {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "What is your name?" },
    {
      type: "list",
      name: "live",
      message: "Where do you live?",
      choices: ["Bengaluru", "Mysore", "Mandya", "Dharawad", "Elsewhere"],
    },
  ]);

  console.log(`Your name is ${answers.name}.`);
  console.log(`You live in ${answers.live}`);
}
```

Make the above script as `quizme` executable in macOS/linux using symbolic links
```shell
$ ln -s /Users/punith.k/code/index.js /usr/local/bin/quizme
``` 

Now run `quizme` from any path in the command line, it will execute the script we linked.

### Handle relative paths in nodejs

With common JS we need to use `__dirname`, if we are using ES6 module use `import.meta.url`
```js
import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

const dirName = dirname(fileURLToPath(import.meta.url))
const filePath = join(dirName, 'data.json')
```

### Parse args using parseArgs (V18.3 above)
```js
import {parseArgs} from 'node:util'

const options = {
  add: {
    type: 'boolean',
    short: 'a',
  }
}

const {values} = parseArgs({options})

// Passing -a or --add to the script parsed by the above options
```