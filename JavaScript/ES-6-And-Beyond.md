## ES6 Fundamentals: Mark Zamoyta

- Check the browser compatibility list for ES6, http://kangax.github.io/

- `let` and `const` have block scoping

- Invoking the function within a function
	```javascript
  const invoice = {
    number: 123,
    process: function() {
      return () => console.log(this.number);
    }
  };
  invoice.process()(); // returns 123
	```

- It is not allowed to bind new object to the arrow function or call or apply methods on new object

- Putting arrow symbol on next line throws, Syntax error: `unexpected token =>`
 	```javascript
  var getPrice = ()
    => 100;
	```

### Default Function Parameters
- Passing product as undefined sets default value 100
	```javascript
  let sample = function(product = 100, type='software') {

  }
  // accepts price passed to the function to compute tax, function or variables in the context can be
  // passed to the function for eg: tax = price * getTax()
  let getTotal = function(price, tax= price * 0.75) {
    console.log(tax);
  }
	```

### Spread and Rest Operator (...)
- ... used as rest symbol before the argument
	```javascript
  let sample = function(price, ...categories) {
  };
  // can be invoked as
  sample(1, 'software', 'hardware');
	```
- ... also used as spread operator, it accepts the array and splits into list of parameters

- ..."45678" - will be spread into 4,5,6,7

- It can also be used to create the new object without mutating

- person object added with the addPowers property and returns the new object without mutating person object
	```javascript
  {...person, addPowers: 'superman'};
	```

### Object Literal Extensions
```javascript
var price = 5.99, quantity = 10;

var productView = {
	price,
	quantity,
	calculateValue() {
	// Passing function name as string is allowed
	// for ex: "calculate value" () -> Can be accessed using, productView["calucalate value"]()
	 return this.price * this.quantity // No longer requires function keyword
	}
};
```

- It returns object as follows, { price: 5.99, quantity: 10 } - it doesn't require `:` to be specified to set the value to the object

### for of Loops
- Loops through elements of an array and characters of a string
	```javascript
  for (var item of categories) {
    // categories = [,,]; -> returns 'undefined undefined'; since elements with in array ends with comma in JavaScript
    console.log(item);
  }
	```

### Octal and Binary Literals
- `0o10` or `0O10`, for octal numbers  
- `0b10` or `0B10`, for binaries

### Template Literals
```javascript
let number = '1350';

// Allows to write content into multiple lines without \n and maintains tabs and newlines
console.log(`Number is: ${number}`);

// returns INV-1350, expressions are allowed within the { }
console.log(`Number is: ${"INV-" + number}`);
```
- Interpolation takes place first before the function calls

- Tagged function literals
	```javascript
  processInvoice `template`; // processInvoice is a function with one parameter
  let invoiceNumber = '1350';
  let amount = '2000';

  processInvoice `Invoice: ${invoiceNumber} for ${amount}`;

  processInvoice(segments, ...values) {
    // returns ["invoice: ", " for ", ""]
    console.log(segments);

    // returns [1350, 2000]
    console.log(values);
  }
	```

### Destructuring - arrays and objects

- Array destructuring
	```javascript
  let salary = ['32', '50', '75'];
  // skip the elements by specifying , between elements for ex: [low, , high] second elementt is not assigned to any variable
  let [low, average, high] = salary;

  console.log(average); // returns 50
	```

- Objects can be assigned to another name as follows,
	```javascript
  const salary = {high: 25, average: 20};
  {high: newHigh, average: newAvg} = salary;
	```

### Classes and Modules:
- Modules, variables and functions can be exported

- importing statements are hoisted to top
	```javascript
  export let moduleId = 99;

  // which can be imported as id as follows,
  import { moduleId as id } from 'module.js';
  // If we try to access moduleId throws runtime error: moduleId is undefined
	```

- We can also import default module names as alias using,
	```javascript
  import { default as myProjectName } from 'module.js';
	```

- We can also export `{ projectId as default, projectName };` when imported projectId is imported as default.

- Classes are not `hoisted`

### New types and Object Extensions

#### Symbols
- It is unique identifier, and not visible while inspecting an elements, and used for debugging purposes.
can be constructed using,
  ```JavaScript
  let eventSymbol = Symbol('resize-event');

  // Returns the symbol registered with event, creates one if not exist
  Symbol.for('event');

  // Symbols can be used as property of an object and can be declared within [], for eg,
  let article = {
    title: 'Title',
    [Symbol.for('article')]: 'My Article'
  };

  // and can be accessed as, returns 'My Article'
  article[Symbol.for('article')];

  // returns symbols in a article object as follows, [Symbol(article)]
  Object.getOwnPropertySymbols(article);
  ```
#### Well-known symbols
```javascript
Symbol.toStringTag; // is a well-known symbol
Blog.prototype[Symbol.toStringTag] = 'Blog Class';
let blog = new Blog();
// returns [object Blog Class] // This is an example of meta-programming
console.log(blog.toString());
```

#### Object Extensions

- `Object.setPrototypeOf(a, b);` - adds all the props of b to a

- `Object.assign(target, a, b);` - here `target` is an `empty object`, parameters of a and b are populated to target object
If both a and b have the same property then b`s property overloads the a`s property. for eg,
  ```javascript
  a = { a: 1}; b = { a: 5, b: 6 }; c = { c: 10 };
  let target = {};
  // target returns, { a: 5, b: 6 }
  Object.assign(target, a, b);

  Object.defineProperty(b, 'c', {
		value: 10,
		enumerable: false // Properties are enumerable by default
	});

  // target has,  { a: 5, b: 6 } because of enumerable set to false
  Object.assign(target, a, b);

  Object.setPrototypeOf(b, c);

  // returns,  { a: 5, b: 6 } - assign will not look through prototype chain
  Object.assign(target, a, b);

  // compares two objects
  Object.is(object, object);

  // returns false, here amount = 0, total = -0; in JavaScript these two are equal
  Object.is(amount, total);
  ```

### String extensions

- Add unicode strings within a string as, `\u{1f3c4}` - astral plane values (1f3c4 returns surfer emoji)

- `String.fromCodePoint(0x1f3c4);` - Gives surfer emoji

- `String.raw`${title} \u{1f3c4}\n`;` - returns interpolated text for title and does not process other characters, it returns raw text

- `String.repeat(10);` - repeats the string specified number of timers

### Number Extensions
- `Number.isInteger(), Number.parseInt(), Number.isSafeInteger()`, and so on..
- `Number.EPSILON, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER` - constants

### Math Extensions
- `Math.sign(0), Math.cbrt(22)`

### RegExp Extensions
- `pattern = /900/yg;`
- `pattern.lastIndex` - last index can be set using `y` flag,
- `pattern.flags` - returns the flags set to the pattern; `gimuy` are the different flags passed to the pattern

### Iterators, Generators, and Promises

#### Iterators
```javascript
let ids = [9000, 9001, 9002];
let id = ids[Symbol.iterator](); -- ids[Symbol.iterator] returns function
it.next(); -- returns {done: false, value: 9000}
```

#### Generators - yields
```javascript
// It does not exist in the function stack, we need iterators to call generators multiple times, * says its a generator
function *process() {
	yield 8000;
	yield 8001;
}

let it = process();
it.next();
```
-  `next()` kicks off the `generator` and then can be passed a value to next as parameter and generator yields,
`let result = yield;`

- `yield` also can be used in arrays as follows,
`let arr = [yield, yield, yield];` and can be set by using `it.next()` as `it.next(1)` `it.next(100)`

- `yield` has low precedence; array can also be yielded, `yield [1,2,3];` - entire array is yielded when iterated,

- To yield the each array items with in a array use, `yield* [1,2,3];` -- it yields 1, 2, 3 as separate yields, `yield*` is known as `iterator delegation`.

- `it.throw('foo');` can be called on generators, it catches the error and terminates the iterator, Generator should have try catch logic

- if no try catch specified, `it.throw('foo');` throws exception: foo on iterating through yield. for eg,
  ```javascript
  function *process() {
		yield 900;
		yield 901;
		yield 902;
  }

  let it = process();
  // returns 900
  it.next();

  // returns Exception: foo
  it.throw('foo');

  // returns (execution terminates)
  it.next();

  // returns {value: "foo", done: true}
  it.return('foo');

  // returns {value: undefined, done: true} though generator has yield
  it.next();
  ```

#### Promises
- It is an object waiting for an async action to complete
  ```javascript
  function doAsync() {
    let p = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, 2000);
    });

    return p;
  }
  ```
- use, `then` function on promise to `reject` and `resolve` the promise,
	```javascript
  doAsync().then(function(value) {
    console.log('fulfilled...');
  },
  function(reason) {
    console.log('rejected...');
  });
  ```

- Then function can be chained, we can also call `catch` function on promise
	```javascript
  doAsync.catch(function(reason) {
    console.log(reason);
  });

  // It accepts two promises, completes both
  Promise.all([p1, p2]).then(...);

  // First completed promise is returned
  Promise.race([p1, p2]).then(...);
  ```

### Arrays and Collections

#### Array Extensions
```javascript
// has only one item in ES6, but in ES5 creating array like, Array(1000) - leads to array of size 1000
Array.of(9000);
Array.from(array, v => v + 100);

// fills each element of array with 900 (replaces the existing element in the array), specifying index will start from that index
array.fill(900, startIndex(inclusive), endIndex(exclusive));

// it won't scan the whole array, returns the first occurrence matching the condition
array.find(value => value > 50);

array.findIndex(function(value, index, array) {
  return value === this;
}, 700);

array.copyWithin(copyToIndex, copyFromIndex);

// returns [0, item1], [1, item2] ...
...array.entries(); -

//  returns index value of an array 0 1 2 ...
...array.keys();

// returns the values of an array
...array.values();
```

#### Array Buffer and Typed Array

- `ArrayBuffer` is an array of `8 bit` bytes
  ```javascript
  new ArrayBuffer(1024);
 // returns 1024
 buffer.byteLength;
 ```

#### Map and WeekMap
```javascript
let emp = { name: 'Jake' };
let emp1 = { name: 'Janet'};

let employees = new Map();
employees.set(emp, 'ABC');
employees.set(emp1, 'CDE');

// returns ABC
employees.get(emp);

// .delete(obj) - to delete an entry
// .length - to get the length of the map
// .clear() - clears the map
// .entries() - returns the entries

let arr = [
  [emp, 'ABC'],
  [emp1, 'CDE']
];

// accepts array of objects as well
let employees = new Map(arr);

//  returns boolean if obj exists
.has(obj);

//  returns all the values in the map
[...employess.values()]; ->

// it is not possible to call .length property on weakmap because object references are garbage collected.
let emp = new WeakMap();
```

#### Set and WeakSet
- Unique values exist in the collection
  ```javascript
  // it accepts array an an argument to create the set
  let perks = new Set();
  set.add('Car');
  set.add('Vacation');

  // returns 2
  perks.size;

  // returns boolean if value exists keys(), values(), entries() supported in set
  perks.has('Car');
  ```

#### Sub classing

- extending the existing Objects in JS

- It helps add user defined functions
  ```javascript
  class Perks extends Array {
  }
  // method 'from' is taken from Array
  let a = Perks.from([5, 10, 15]);
  ```

#### The Reflect API:
- DSL - Domain Specific Language

- Object Construction and method calls - Reflect is an Object
	```javascript
  Reflect.construct(target, argumentList[, newTarget]);

  // arguments should be passed as an array
  Reflect.construct(Resturant, ['abc', cde]);
  Reflect.apply(Resturant.prototype.show, {id: 99});
  Reflect.getPrototypeOf(Resturant);

  // sets the property setup to r
  Reflect.setPrototypeOf(r, setup);

  // gets the id from r
  Reflect.get(r, 'id');

  // sets the id on r, alt is new object and assign the 100 to id prop in alt object
  Reflect.set(r, 'id', 100, alt);

  // true if the property exists
  Reflect.has(r, 'id');

  // array of properties in the r
  Reflect.ownKeys(r);
  Reflect.defineProperty(r, 'id', { value: 100, enumerable: true});
  Reflect.deleteProperty(r, 'id');

  // Returns descriptor object, which contains, configurable, enumerable, writable and value property with values
  Reflect.getOwnPropertyDescriptor(r, 'id');

  // prevents adding new property to target object
  Reflect.preventExtensions(target);

  // to check whether target is extensible
  Reflect.isExtensible(target);
  ```

#### The Proxiy API

- Its an object wraps an another object
- used for security in the application, used for profiling
  ```javascript
  var p = new Proxy(employeeObject, {
    get: function(target, prop, reciever) {
      if(prop === 'salary') return 'denied';
      return Reflect.get(target, prop, reciever);
    }
  });

  p.salary;

  var p = new Proxy(getIdProperty, {
    apply: function(target, prop, reciever) {
      return Reflect.apply(target, prop, reciever);
    }
  });

  // Instead of using return type enclose it in a () as follows
  const arrowFunc = (data) => ({
    type: 'ACTION_1',
    payload: data,
  });
```

### Writing arrow functions better way
```javascript
const arrowFunc = (data) => {
	return {
		type: 'ACTION_1',
		payload: data,
	};
};
```