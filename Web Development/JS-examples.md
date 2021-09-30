## Tips and Tricks

Add `debugger` text in the source code, so that chrome developer tools takes to that point when that point is hit.

## Lint errors and fixes

`no-undef` lint error fix: can be added global section of webpack.config
https://github.com/chaijs/type-detect/issues/98

Lint error while using single return statement in arrow function:
unexpected block statement surrounding arrow body

Disable ESLint errors in-line
```
// eslint-disable-next-line no-use-before-define

/* eslint-disable no-unused-vars */
```

## Code Snippets

## Fetch API for a POST request 

```js
async function fetchGraphQL(text, variables) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer <token>`, // Get it from,  github.com/settings/tokens
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}
```

### Filter an array based on type

```js
const requiredOrders = orders.filter(order => order.required);
```

### Converting array to JSON Data

```js
function convertToJSON(items) {
	return JSON.parse(JSON.stringify(items));
}
```

### Get the data from event object

```js
saveUserData(event) {
	var field = event.target.name;
	var value = event.target.value;
	this.state.author[field] = value;

	return this.setState({ author: this.state.author});
}
```

### Passing Parameters to function from render

```js
onClick={() => this.deleteRow(index)}
```

### Unique Array: Pass concatenated array as input

```js
uniqueArray (arrArg) {
 return arrArg.filter((elem, pos, arr) => {
	 return arr.indexOf(elem) === pos;
	});
}
// ES-5:
array1 = array1.filter(function(val) {
	return array2.indexOf(val) === -1;
});
// ES6:
array1 = array1.filter(val => !array2.includes(val));
```

### Remove the item already present in an array

```js
arr.filter(item => item !== itemToRemove);
```

### Sorting array based on Parameters

```js
array.sort((last, first) => last.displayValue > first.displayValue);
```

### Debouncing the search to happen after certain amount time use `lodash.debounce()`

```js
doSearch = debounce(() => {}, 300);
handleSearch = (event) => {
	this.setState({ searchTerm: event.target.value}, () => {
		this.doSearch();
	});
}
```

### Perform search on object using `lodash.pickby`

```js
render() {
	let { articles, searchTerm } = this.state;

	if (searchTerm) {
		articles = pickBy(articles, (value) => {
			return value.title.match(searchTerm) || value.body.match(searchTerm);
		});
	}
}
```

### Get Cheapest items first custom sort

```js
function newItemsCheapestFirst(items) {
  return items
    .filter(item => item.isNew) // filters only new items
    .sort((a, b) => {
      if(a.price < b.price) {
        return -1;
      } else if(a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });
}
```

### Compute the square of positive integers (don't consider negative numbers)

```js
const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];

const squareList = arr => {
	return arr
		.filter(c => Number.isInteger(c))
		.filter(a => Math.sign(a) == 1)
		.map(b  => b * b);
};
```

### Custom string repeat method like `String.prototype.repeat(n)`

```js
String.prototype.customRepeat = function(num) {
	return Array(num).fill(this).join(""); // any thing can be joined
}
// usage
"abc".customRepeat(2); // returns, abcabc
```

### Generates random colours

```js
const randomColour = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);
```

### Remove array duplicates

```js
const arr = [1, 2, 3, 4, 1, 2, 6];
const uniqueArray = [...new Set(array)];

// indexOf() returns the first index at which a given element can be found in the array.
// 1 is found at 0 and current index of second 1 in the array is 4 which doesn't match and filtered out
const uniqueArray = arr.filter((item, index) => arr.indexOf(item) === index);
```

Create array with `Array.from()`

```js
// Creates 4 items with index value, [0, 1, 2, 3]
const items = Array.from({length: 4}, (_, i) => i + 1)
```

### Storing and retrieving object from local storage

```js
const todos = [{
	id: 1,
	item: 'item-1',
	completed: false
}]
localStorage.setItem('todos', JSON.stringify(todos))
let localTodos = JSON.parse(localStorage.getItem('todos'))

// Remove localStorage
localStorage.removeItem('todos')
```

### Fetch the data from REST end point until all the pages reached

If an API end point gives all the jobs then no need of this

[Github Jobs API](https://jobs.github.com/positions.json)

```js
// one of the way to do
var fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithubJobs() {
	let resultCount = 1;
	let page = 0;
	let allJobs = [];

  // fetch all pages
  while(resultCount > 0) {
		const res = await fetch(`${baseURL}?page=${page}`);
    const jobs = await res.json();
    allJobs = [...allJobs, ...jobs]; // use push if you want to mutate the array
    resultCount = jobs.length;
    page++;
  }

	console.log('Total Jobs', allJobs.length)
}

fetchGithubJobs();
```

### Assign CSS styles to an element

```js
let element = document.createElement("div");
let style = { position: "absolute", left: 0, top: 0 };

Object.entries(style).map(entry => {
	let [property, value] = entry;
  element.style[property] = value;
});
```

### Create an empty array of some length and return some object

```js
[...Array(10)].map((_,i) => ({
	id: i,
	title: 'name', // can be chosen from array of data
	price: '$1.0'
}))
```

### Returning an object from an arrow function

```js
const arrowFunc = (data) => ({
  type: 'ACTION_CLOSE',
  payload: data
})
```

### Generate a dynamic grid 2*2 with null values

```js
const generateGrid = (rows, columns, mapper) =>
	Array(rows).fill().map(() => Array(columns).map(mapper))

// Usage
generateGrid(3, 3, () => null)
// Generates an array of 3x3 with null values
```

### Create the deep clone of an object

```js
const cloneDeep = x => JSON.parse(JSON.stringify(x))
```

## Missing letters

Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return `undefined`. `stvwx` => `u`, `abce` => `d`
```js
function fearNotLetter(str) {
	const letters = "abcdefghijklmnopqrstuvwxyz".split("")
	const startingIndexOfSearchStr = letters.indexOf(letters.find(e => str.split("").includes(e)))
	const filteredText  = letters.filter(letter => !str.includes(letter))

	return filteredText.length === 0 ? undefined : filteredText[startingIndexOfSearchStr];
}
```

## Reverse a string using reduceRight()

```js
const reverseString = str =>
	str.split("").reduceRight((x, y) => x + y, "");
```

## ## Reverse a string using reduce()
```js
const reverseString = str =>
	str.split("").reduce((x, y) => y + x, "");
```

## Factorial of a number using range and reduce

```js
const range = (start, stop) => new Array(stop - start).fill(0).map((v, i) => start + i)

const factorialByRange = n => range(1, n + 1).reduce((x, y) => x * y, 1);
```

## Gerenate Alphabets using range

```js
const alphabets = range("A".charCodeAt(), "Z".charCodeAt() + 1).map(x => String.fromCharCode(x));
```

## Find the difference between two arrays

```js
const arrayDiff = (firstArr, secondArr) => {
	const uniqueSecondArr = new Set(secondArr);
	return firstArr.filter(item => !uniqueSecondArr.has(elem));
}
```

## Tricky JS

### [] == ![]; // -> true

💡Explanation:
The abstract equality operator (==) converts both sides to numbers to compare them, and both sides become the number 0 for different reasons.
Arrays are `truthy`, so on the right, the opposite of a truthy value is false, which is then coerced to 0.
On the left, however, an empty array is coerced to a number without becoming a boolean first, and empty arrays are coerced to 0, despite being truthy.

```js
+[] == +![];
0 == +false;
0 == 0;
true;
```

```js
false == []; // -> true
false == ![]; // -> true
```

💡Explanation:
```JS
false == []; // -> true

toNumber(false); // -> 0
toNumber([]); // -> 0

0 == 0; // -> true

false == ![]; // -> true
// if it finds right hand side type is matching with left hand side,
// it compares them immediately before converting it to number.
![]; // -> false

false == false; // -> true
```
