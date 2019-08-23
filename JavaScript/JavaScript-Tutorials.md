### Must know concepts

- `typeof` operator on different values
	```javascript
	typeof 100n = 'bigint';
	typeof NaN = 'number';

	typeof Object = 'function'

	typeof {} = 'object';
	typeof [] = 'object';
	typeof new Object() = 'object';
	typeof null = 'object';
	```
- `in` operator - can be used to check if a `property name` exists in an object
	```javascript
	"c" in {"a": 1, "b": 1, "c": 1}; // true
	1 in {"a": 1, "b": 1, "c": 1}; // false, 1 is not a property
	```

- When used together with `arrays`, will check if an index exists.
	```javascript
	"c" in ["a", "b", "c"]; // false
	1 in ["a", "b", "c"]; // true
	```
> Note, it is ignorant of actual value(in either arrays or objects.)

- It allows to check properties on built-in data types.
	```javascript
	"length" in []; // true
	"length" in {}; // true

	// the length property does not exist natively unless added
	"length" in {}; // false
	"length" in {"length": 1} // true
	```

- `...spread` operator – expand iterables into one or more arguments.
- `...rest` parameter – collect all remaining parameters ("the rest of") into an array.

- When `var`, `let`, or `const` specified, `var` is assumed
	```javascript
	[a] = [1];
	window.a // returns 1
	```

- `let` definitions are not available as a property on window object.

- All the `var` declarations are moved up the scope, called `Hoisting`. In case of function
they are hoisted up to function declaration

- `let` declarations are scoped to the `nearest block` and are `not hoisted`.

### JavaScript objects and properties

- Constructor function
	```javascript
	function Patient(name, address, case) {
		this.name = name;
		this.address = address;
		this.case = case;
	}

	const patient = new Patient('Patient-1', 'Bengaluru', 'Fever');
	```

- Define a property of an object
	```javascript
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

- Usage of getter and setter
	```javascript
	cat.fullName = 'Muffin Top';
	display(cat.fullName);
	display(cat.name.first);
	```

### Prototypes
- Defining prototype to get the last element of an array
	```javascript
	let arr = ['red', 'blue', 'green'];

	let last = arr.last
	// returns undefined, because last property is not defined on JavaScript array, it can be added as follows,
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

- A Function prototype: is an object `instance` that will become the prototype for all objects created using this function as a constructor.
- An Object's prototype: is the object instance from which the object is inherited.
	```javascript
	function Cat(name, color) {
		this.name = name;
		this.color = color;
	}

	Cat.prototype.age = 3; // will add age prototype to cat function (Can also be created as, Cat.prototype = {age: 5};)

	var fluffy = new Cat('Fluffy', 'White');
	var muffin = new Cat('Muffin', 'Brown');

	display(fluffy.age);
	display(muffin.age); // will display age '4'

	fluffy.age = 5; // it adds new property to fluffy object and display(fluffy.age) displays '5'
	// and fluffy.__proto__.age will still display '4' since it is a prototype not an property
	```

#### Creating prototype chains
```javascript
Function Animal(voice) {
	this.voice = voice || 'grunt';
}

// Making all the animals make sound
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

#### Creating prototypes with classes
```javascript
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

## JQuery

-	Load JQuery from CDN if it fails add the script tag as follows,
	```javascript
	<script>
			window.JQuery || document.write('<script src="jquery.js"><\/script>')
		</script>
	```

###	Selectors
```javascript
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
- Iterating through nodes:
	```javascript
	$('div').each(function(index) {
		$(this).text(); // need to wrap JQuery object to this element
	});
	(or)
	$('div').each(function(index, element) {
		$(element).text(); // No need to wrap JQuery object, element refers to this
	});
	```

###	Appending or removing nodes
```javascript
$('<span>(office)</span>').appendTo('.officePhone'); or
$('.officePhone').append('<span>(office)</span>');

// prepend will add it to the begining of the elements
wrap(); - Wrapping elements

<div class="state">Arizona</div>
$('.state').wrap('<div class="US_State"/>'); this will results in
<div class="US_State">
	<div class="state">Arizona</div>
</div>

.remove() is used to remove the nodes.
addClass(), removeClass(), toggleClass()
```

###	Handling Events:
- Identifying event type, `event.type`; returns a string

- Multiple events and handlers can be defined in on() using a map
	```javascript
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
```javascript
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

## Asynchronous JS:
```javascript
window.onload = function() {
	var http = XMLHttpRequest();

	http.onreadystatechange = function() {
		if (http.readyState === 4 && http.status === 200) {
				console.log(JSON.parse(http.response)); // JSON.parse converts to JavaScript object
		}
	};

	http.open('GET', 'data/source.json', true); // true for async calls
	http.send();
};
```

## Regular expressions
- https://regex101.com/

- `test()` function to test whether the given pattern exists in a given string, pattern should be
	mentioned with in `/test-pattern/`
	```javascript
	const str = "test string";
	const pattern = /test/;
	pattern.test(str); // returns true if given string matches the pattern
	```
- add flag `i` to ignore the case-sensitiveness in the string to be matched eg: `const pattern=/test/i`

- `match()` function can be used to extract the actual matches, returns an array of matched string only one string is matched
	```javascript
	"Hello, World!".match(/Hello/);
	// Returns ["Hello"]
	let ourStr = "Regular expressions";
	let ourRegex = /expressions/;
	ourStr.match(ourRegex);
	// Returns ["expressions"]
	```
- add flag `g` to pattern to match more than once in a given string eg: `const pattern=/test/g`


- `/text/gi` - `g` specifies all matches in the file or object, `i` specifies for case insensitive.

- `/[ti]ext/g` - matches `t` or `i` as first character in the text.

- `/[^aeiou]man/g` - excludes `a or e or i or o or u` from the first character being matched.

- `/[a-zA-Z]man/g` - first character can be any character and can be case insensitive. It can be any range a-f, k-q and can be number
	range as well 0-9, 1-6; To make the whole sentence case insensitive add `i` flag to it or it applies to first character.

- `/[0-9]+/g` - matches at between one and unlimited numbers for ex: 123030330030003.....

- `/[0-9]{11}/g` - matches exact 11 numbers.

- `/[0-9]{11, 15}/g` - matches between 11 to 15(inclusive) numbers.

- `/[0-9]{5, }/g` - Matches at least 5 and any number, not less than 5.

- `\d` - matches any digit, `\w` - matches any word character `(a-z, A-Z, 0-9, and _'s)`,
	`\s` - match a white space, `\t` - matches only tabs

- `/\d{3}\w{10}` - matches 3 digits followed by 10 word characters.

- `+` - at lease one or more

- `?` - zero-or-one qualifier (makes a preceding char optional)

- `.` - any character whatsoever (except new line character)

- `*` - zero-or-more qualifier

- `^[a-z]{5}$` - it takes only 5 characters, in the beginning and ending with 5 characters, doesn't matches anything else
	ex: `abcde` - matched not the `abc` or  `abdjdkjdjd`

	`[a-z]{5}$` - matches 5 characters at the end

- Regular expression capture groups:
- Capturing groups in regex is simply extracting a pattern from `() `.
	You can capture groups with `/regex/.exec(string)` and with `string.match`.
	Regular capture group is created by wrapping a pattern in `(pattern)`.
	But to create groups property on resulting object use: `(?<name>pattern)`

## Debugging JS in Chrome Developer tools

- Don't declare global variables

- Protect variables with scope
	```javascript
	// Closure function
	(function () {
		let now = new Date();
		funciton doSomething() {
			// do something
		}
	})();
	```

- `console.table(data, ['name', 'email']);` - To print the JSON data in table form

-	`console.log('%c Error', 'color: white, background: red');` - Apply the style to log

- `console.dir(names, {colors: true, depth:null});` - shows the array of objects in colors

- The `Console` method `dir()` displays an interactive list of the properties of the specified JavaScript object. The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.
