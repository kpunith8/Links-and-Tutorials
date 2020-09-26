## Important Concepts

`typeof` operator on different values
```js
typeof 100n = 'bigint';
typeof NaN = 'number';

typeof Object = 'function'

typeof {} = 'object';
typeof [] = 'object';
typeof new Object() = 'object';
typeof null = 'object';
```

`in` operator can be used to check if a `property name` exists in an object
```js
"c" in {"a": 1, "b": 1, "c": 1}; // true
1 in {"a": 1, "b": 1, "c": 1}; // false, 1 is not a property
```

When used together with `arrays`, will check if an index exists.
```js
"c" in ["a", "b", "c"]; // false
1 in ["a", "b", "c"]; // true
```
> Note, it is ignorant of actual value(in either arrays or objects.)

It allows to check properties on built-in data types.
```js
"length" in []; // true
"length" in {}; // true

// the length property does not exist natively unless added
"length" in {}; // false
"length" in {"length": 1} // true
```

`...spread` operator – expand iterables into one or more arguments.

`...rest` parameter – collect all remaining parameters ("the rest of") into an array.

When `var`, `let`, or `const` specified, `var` is assumed
```js
[a] = [1];
window.a // returns 1
```

`let` definitions are not available as a property on `window` object.

All the `var` declarations are moved up the scope, called `Hoisting`. In case of function
they are hoisted up to function declaration

`let` declarations are scoped to the `nearest block` and are `not hoisted`.

Only `function declarations` will be visible to `window/this/global object` not the `function
expressions` or `arrow` functions.

### Objects and Properties

Constructor function
```js
function Patient(name, address, case) {
	this.name = name;
	this.address = address;
	this.case = case;
}

const patient = new Patient('Patient-1', 'Bengaluru', 'Fever');
```

Define a property of an object
```js
var cat = {
	name: { first: 'Fluffy', last: 'LaBeouf' },
	color: 'White'
};

Object.defineProperty(cat, 'fullName', {
	get: function() {
		return this.name.first + ' ' + this.name.last;
	},
	set: function(value) {
		var nameParts = value.split(' ');
		this.name.first = nameParts[0];
		this.name.last = nameParts[1];
	}
});
```

Usage of getter and setter
```js
cat.fullName = 'Muffin Top';
display(cat.fullName);
display(cat.name.first);

function display(data) {
	console.log(data);
}
```

### Prototypes

Defining prototype to get the last element of an array
```js
let arr = ['red', 'blue', 'green'];

let last = arr.last
// returns undefined, because last property is not defined on js array, it can be added as follows,
// Define last property on arr object, if you want to do it on Array object, replace arr with Array.prototype
Object.defineProperty(arr, 'last', {
	get: function() {
			return this[this.length-1];
	}
});

var myFunc = function() {
};
display(myFunc.prototype); // returns an empty {}
var cat = {name: 'abc'};
display(cat); // returns undefined, it has no prototype, it has __proto__ property, accessed using object.__proto__
```

A Function prototype: is an object `instance` that will become the prototype for all objects created using this function as a constructor.
An Object's prototype: is the object instance from which the object is inherited.
```js
function Cat(name, color) {
	this.name = name;
	this.color = color;
}

Cat.prototype.age = 4; // will add age prototype to cat function (Can also be created as, Cat.prototype = {age: 5};)

var fluffy = new Cat('Fluffy', 'White');
var muffin = new Cat('Muffin', 'Brown');

display(fluffy.age);
display(muffin.age); // will display age '4'

fluffy.age = 5; // it adds new property to fluffy object and display(fluffy.age) displays '5'
// and fluffy.__proto__.age will still display '4' since it is a prototype not an property
```

#### Create prototype chains

```js
Function Animal(voice) {
	this.voice = voice || 'grunt';
}

// Making all the animals to make sound
Animal.prototype.speak = function() {
	display(this.voice);
}

// Adding animal prototype to Cat
Cat.prototype = Object.create(Animal.prototype);

fluffy.speak(); // will display 'Grunt'

// It can be called from Cat function as,
function Cat(name, color) {
	Animal.call(this, 'Meow');
	this.name = name;
	this.color = color;
}

// this will make Cat object as Animal and if you want it as Cat instance,
Cat.prototype.constructor = Cat
fluffy.__proto__ // returns Cat and fluffy.__proto__.__proto__ returns Animal
```

#### Prototypes with classes

```js
Class Animal {
	constructor(voice) {
		this.voice = voice || 'Grunt';
	}

	speak() = {
		display(this.voice);
	}
}

Class Cat extends Animal {
	constructor(name, color) {
		super('Meow');
		this.name = name;
		this.color = color;
	}
}
```

## Asynchronous JS using XMLHttpRequest

```js
window.onload = function() {
	var http = XMLHttpRequest();

	http.onreadystatechange = function() {
		if (http.readyState === 4 && http.status === 200) {
				console.log(JSON.parse(http.response)); // JSON.parse converts to js object
		}
	};

	http.open('GET', 'data/source.json', true); // true for async calls
	http.send();
};
```

## Regular expressions

https://regex101.com/

`test()` function to test whether the given pattern exists in a given string, pattern should be
mentioned with in `/test-pattern/`
```js
const str = "test string";
const pattern = /test/;
pattern.test(str); // returns true if given string matches the pattern
```

Add flag `i` to ignore the case-sensitiveness in the string to be matched eg: `const pattern=/test/i`

`match()` function can be used to extract the actual matches, returns an array of matched string only one string is matched
```js
"Hello, World!".match(/Hello/);
// Returns ["Hello"]
let ourStr = "Regular expressions";
let ourRegex = /expressions/;
ourStr.match(ourRegex);
// Returns ["expressions"]
```

Add flag `g` to pattern to match more than once in a given string eg: `const pattern=/test/g`

`/text/gi` `g` specifies all matches in the file or object, `i` specifies for case insensitive.

`/[ti]ext/g` matches `t` or `i` as first character in the text.

`/[^aeiou]man/g` excludes `a or e or i or o or u` from the first character being matched.

`^` matches the start of the input string

`$` matches the end.

`/^\d+$/` matches a string consisting entirely of one or more digits

`/^!/` matches any string that `starts` with an `exclamation mark`

 `/x^/` does not match any string (there cannot be an x before the start of the string)

`\b\b` word boundary `/\b\d+ (pig|cow|chicken)s?\b/`
	`Pipe(|)` character denotes a choice between the pattern to its left and pattern to its right.

`/[a-zA-Z]man/g` first character can be any character and can be case insensitive. It can be any range a-f, k-q and can be number
	range as well 0-9, 1-6; To make the whole sentence case insensitive add `i` flag to it or it applies to first character.

`/[0-9]+/g` matches at between one and unlimited numbers for ex: 123030330030003.....

`/[0-9]{11}/g` matches exact 11 numbers.

`/[0-9]{11, 15}/g` matches between 11 to 15(inclusive) numbers.

`/[0-9]{5, }/g` Matches at least 5 and any number, not less than 5.

`\d` matches any digit, `\w` matches any word character `(a-z, A-Z, 0-9, and _'s)`,
	`\s` match a white space, `\t` matches only tabs

`/\d{3}\w{10}` matches 3 digits followed by 10 word characters.

`+` at lease one or more

`?` zero-or-one qualifier (makes a preceding char optional)

`.` any character whatsoever (except new line character)

`*` zero-or-more qualifier

`^[a-z]{5}$` it takes only 5 characters, in the beginning and ending with 5 characters, doesn't matches anything else
ex: `abcde` matched not the `abc` or  `abdjdkjdjd`

`[a-z]{5}$` matches 5 characters at the end

### Regular expression capture groups

Capturing groups in regex is simply extracting a pattern from `()`.
You can capture groups with `/regex/.exec(string)` and with `"string".match()`.

Regular capture group is created by wrapping a pattern in `(pattern)`.
But to create groups property on resulting object use: `(?<name>pattern)`

### Examples

https://www.regextester.com/

Binary or Hexa/decimal numbers `/\b([01]+b|[\da-f]+h|\d+)\b/`
Domain `^(?!://)([a-zA-Z0-9-_]+.)*[a-zA-Z0-9][a-zA-Z0-9-_]+.[a-zA-Z]{2,11}?$`

IPv4 address
	`^(?:(?:25[0-5]{1}.)|(?:2[0-4]{1}[0-9]{1}.)|(?:1{1}[0-9]?[0-9]?.)|(?:[0-9]{1}[0-9]?.)){3}(?:(?:25[0-5]{1})|(?:2[0-4]?[0-9]?)|(?:1{1}[0-9]?[0-9]?)|(?:[0-9]{1}[0-9]?)){1}$`

IPv6 address
  `^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$`

```js
const domainPattern = '^(?!://)([a-zA-Z0-9-_]+.)*[a-zA-Z0-9][a-zA-Z0-9-_]+.[a-zA-Z]{2,11}?$'
const domainRegExp = new RegExp(domainPattern)
// Usage
domainRegExp.test('example.com') // true
domainRegExp.test('http://example.com') // false

// Combining domain, ip address patterns, tests both domain or IP addresses
const ipAddressAndDomainRegExp = new RegExp(`${domainRegExp.source}|${ipv4AddressRegExp.source}|${ipv6AddressRegExp.source}`)
domainRegExp.test('123.11.11.22') // true
domainRegExp.test('256.11.11.22') // false
```

### replace() and replaceAll() on string

String values have a `replace()` method that can be used to replace part of the string with another string
```js
"Borobudur".replace(/[ou]/, "a")) // Barobudur

"Borobudur".replace(/[ou]/g, "a")); // Barabadar

"Liskov, Barbara\nMcCarthy, John\nWadler, Philip".replace(/(\w+), (\w+)/g, "$2 $1"));
// Barbara Liskov
// John McCarthy
// Philip Wadler

// The $1 and $2 in the replacement string refer to the parenthesized groups in the pattern
```

We can pass a `function` rather than a string as the second argument to `replace`
```js
let s = "the cia and fbi";
s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()) // CIA and FBI

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs
```

Replace all the comments in the JS code
```js
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
//  [^] (any character that is not in the empty set of characters) as a way to match any character
// We cannot just use a period here because block comments can continue on a new line,
// and the period character does not match newline characters.
stripComments("1 /* a */+/* b */ 1") // 1 + 1
```

## Design Patterns

### Ice Factory

Issues creating objects using classes

Objects created using the `new` keyword are mutable
```js
// Method can be re-assigned to something when object is created using new
const db = []
const cart = new ShoppingCart({db});
// addProduct is a function inside a ShoppingCart
cart.addProduct = () => 'nope!'

// No Error on the line above!
cart.addProduct({
  name: 'foo',
  price: 9.99
}) // output: "nope!", instead of adding the product it returns "nope!"
```

Objects created using the `new` keyword `inherit` the `prototype` of the class that was used to create them.
So, changes to a class prototype affect all objects created from that class.
even if a change is made after the object was created!
```js
const cart = new ShoppingCart({db: []})
const other = new ShoppingCart({db: []})

ShoppingCart.prototype.addProduct = () => ‘nope!’
// No Error on the line above!

cart.addProduct({
	name: 'foo',
	price: 9.99
}) // output: "nope!"

other.addProduct({
  name: 'bar',
  price: 8.88
}) // output: "nope!"
```

An `Ice Factory` is just a function that creates and returns a `frozen object`.
With an Ice Factory our shopping cart example looks like this:
```js
function makeShoppingCart({db}) {
  return Object.freeze({
    addProduct,
    empty,
    getProducts,
    removeProduct,
    // other methods
  })

	// It can also have private members that can not be exposed outside this object
	const secret = 'shhh';

	function addProduct (product) {
    db.push(product)
  }

  function empty () {
    db = []
  }

  function getProducts () {
  	return Object.freeze([...db])
  }

  function removeProduct (id) {
    // remove a product
  }
}
```

`Object.freeze()` is `shallow`, so if the object we return contains an array or
another object we must make sure to Object.freeze() them as well

#### Inheriting features

Along with our `ShoppingCart`, we probably have a `Catalog` object and an `Order` object.
And all of these probably expose some version of `addProduct` and `removeProduct` methods.

Use Composition over class inheritance

Product list
```js
function makeProductList({productDb}) {
  return Object.freeze({
    addProduct,
    empty,
    getProducts,
    removeProduct
  })
}
```

Shopping cart
```js
function makeShoppingCart(productList) {
  return Object.freeze({
    items: productList,
    someCartSpecificMethod,
	})
	function someCartSpecificMethod () {}
}
```

And now we can just inject our `ProductList` into our `ShoppingCart`, like this:
```js
const productDb = []
const productList = makeProductList({ productDb })

const cart = makeShoppingCart(productList)
	```

And use the ProductList via the `items` property, as follows
```js
cart.items.addProduct()
```

## Mixins

Mixin is a way properties are added to objects without using inheritance.

Mixins provide an alternate way of composing your application.

Mixins are a form of object composition, where component features get mixed
into a composite object so that properties of each mixin become properties of the composite object.
```js
const myDetails = {}

const firstName = { firstname: "Punith" }
const lastName = { surname: "K" }
const occupation = { occupation: "Software Engineer" }
const nationality = { nationality: "India" }

// Assigning myDetails object the properties
Object.assign(myDetails, firstName, lastName, occupation, nationality);
```

`Object.assign` composes only dynamic objects, and `copies` the properties, not the whole object

## Debugging in Chrome Developer tools

Use `DevTool snippets` to configure the dev tool, https://bgrins.github.io/devtools-snippets/
will be available across the websites

Don't declare global variables

Protect variables with scope
```js
// Closure function
(function () {
	let now = new Date();
	function doSomething() {
		// do something
	}
})();
```

`console.table(data, ['name', 'email']);` To print the JSON data in table form

`console.log('%c Error', 'color: white, background: red');` Apply the style to log

`console.dir(names, {colors: true, depth:null});` shows the array of objects in colors

The `console` method `dir()` displays an interactive list of the properties of the specified js object.
The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.

`console.trace()` to print the trace

Use `Event Listener Breakpoints` -> select the `mouse -> click` option which opens the first line
where the event listener added

use `console.log` with `JSON.parse(JSON.stringify(arr))`
```js
let arr = [1, 2, 3]

// console.log(arr) // would display the array after the change made, if it was mutated
console.log('arr before pushing:', JSON.parse(JSON.stringify(arr)))

// Push an item to arr
arr.push(4)

// It prints 4 items and the above console prints 3
console.log('arr before pushing:', JSON.parse(JSON.stringify(arr)))
```

`console.time('name')` and `console.timeEnd('name')` to measure the time it takes to execute the code

`performance.now()` to measure the time it takes to execute a block of code
```js
let t0 = performance.now()

// Code
let t1 = perfomance.now()
let res = t1 t0
```

`debug(methodName)` in the console pass the function name to debug and it takes to that function
	if it exists in the current scope or in the project and `unregister` it by, `undebug(methodName)`

`monitor(methodName)` gives the details about the params passed to the function, `unmonitor(methodName)`
	to not to monitor anymore

`Cmd + Shift + O` To search for functions in the current file

`Cmd + Shift + P` To search for anything in the dev tools

Make the changes made in `devtools` reflect in actual files, go to `Source -> File System Tab` -> add the folder

### Other debugging methods

`getEventListeners(elem)` lists all the listeners added to the element

`monitorEvents(elem, ['click', 'hover', 'mouseout'])` To monitor the events performed on the element

`unmonitorEvents(elem)` to stop monitor the element events

### Copy the objects from console to clipboard

Right click on the object and select `Store as global variable`
it copies to `temp1` variable, use `copy(temp1)` method to copy to `clipboard`

### Style the hover elements or context menus with the help of debugger

Open the developer tools and go to console and type this code
```js
setTimeout(() => {debugger}, 3000);
```

## jQuery

###	Selectors

```js
$('a[title="Programming"]'); // selects <a> elememts that have a title attribute with the specified value
or
$('a[title]') // selects <a> elememts that have a title attribute
$(':input') // selects all input elements, including button, select, textares, button, images, radio and more
$(':input[type="radio"]') // Selects all radio buttons on the page, and
$('input') selects only selects input fields

$('input[value^="sample"]') // Selects any input element whose value attribute begins with "sample" (Case sensitive), use $ to find ends with and use * to find a word contains.

$('div:contains("my div")')

$('div:eq(0)') Finds the first div
```

###	Interaction with DOM

Iterating through nodes
```js
$('div').each(function(index) {
	$(this).text(); // need to wrap JQuery object to this element
});
(or)
$('div').each(function(index, element) {
	$(element).text(); // No need to wrap JQuery object, element refers to this
});
```

###	Appending or removing nodes

```js
$('<span>(office)</span>').appendTo('.officePhone'); or
$('.officePhone').append('<span>(office)</span>');

// prepend will add it to the beginning of the elements
wrap(); Wrapping elements

<div class="state">Arizona</div>
$('.state').wrap('<div class="US_State"/>'); this will results in
<div class="US_State">
	<div class="state">Arizona</div>
</div>

// .remove() is used to remove the nodes.
// addClass(), removeClass(), toggleClass()
```

###	Handling Events

Identifying event type, `event.type`; returns a string

Multiple events and handlers can be defined in on() using a map
```js
$('#MyTable tr').on({
	mouseenter: function() {
		$(this).addClass('mouseEnter');
	},
	mouseleave: function() {
		$(this).removeClass('mouseEnter');
	},
	mouseover: function() {
		// Any other action
	}
});

// hover(mouseEnter, mouseleave);
// toggle() // toggels through functions defined within
```

###	Ajax in jQuery

```js
$.get() and $.post() // gets raw data from the server
$(selector).load() // Loads html data from the sever
$.getJSON() // get/post and return JSON
$.ajax() // core functionality

// jQuery ajax functions work with REST APIs and web services

$('#myDiv').load('../sample.html #myID'); // Which loads only #myID content from the sample.html
$.get(url, data, callback, datatype);

$.get('sample.html', function(data){
	$('#outputDiv').html(data);
});
```

## References

[JS Equality Table](https://dorey.github.io/js-Equality-Table/)
