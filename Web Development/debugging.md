## Debugging in Chrome

Add `debugger` text in the source code, so that chrome developer tools takes to that point when that code path is executed.

### Shortcuts

`Cmd + Shift + O` - search for functions in the current file

`Cmd + Shift + P` - search for anything in the dev tools

[DevTool snippets](https://bgrins.github.io/devtools-snippets/) will be available across the websites

### Logging 

`console.table(data, ['name', 'email']);` To print the JSON data in table form

`console.log('%c Error', 'color: white, background: red');` Apply the style to log

`console.dir(names, {colors: true, depth:null});` shows the array of objects in colors

The `console()` and `dir()` methods displays an interactive list of the properties of the specified js object.
The output is presented as a hierarchical listing with disclosure triangles that let you see the contents of child objects.

`console.trace()` to print the trace

Use `console.log()` with `JSON.parse(JSON.stringify(arr))`
```js
let arr = [1, 2, 3]

// console.log(arr) // would display the array after the change made, if it was mutated
console.log('arr before pushing:', JSON.parse(JSON.stringify(arr)))

// Push an item to arr
arr.push(4)

// It prints 4 items and the above console prints 3
console.log('arr before pushing:', JSON.parse(JSON.stringify(arr)))
```
### Event Listener breakpoints

Use `Event Listener Breakpoints` -> select the `mouse -> click` option which opens the first line
where the event listener added

## Measure the performance of JS code
`console.time('name')` and `console.timeEnd('name')` to measure the time it takes to execute the code

`performance.now()` to measure the time it takes to execute a block of code
```js
let t0 = performance.now()

// Code
let t1 = perfomance.now()
let res = t1 t0
```

## Other usefull methods

`debug(methodName)` in the console pass the function name to debug and it takes to that function
	if it exists in the current scope or in the project and `unregister` it by, `undebug(methodName)`

`monitor(methodName)` gives the details about the params passed to the function, `unmonitor(methodName)`
	to not to monitor anymore

Make the changes made in `devtools` reflect in actual files, go to `Source -> File System Tab` -> add the folder

### Other debugging methods

`getEventListeners(elem)` lists all the listeners added to the element

`monitorEvents(elem, ['click', 'hover', 'mouseout'])` To monitor the events performed on the element

`unmonitorEvents(elem)` to stop monitor the element events

### Copy the objects from console to clipboard

Right click on the object and select `Store as global variable`
it copies to `temp1` variable, use `copy(temp1)` method to copy to `clipboard`

### Style the hover elements or context menus with the help of debugger

Open the developer tools and go to console and type this code, and trigger the action on
elements within 3 seconds of the delay so that the debugger stops and you can start 
debugging or inspect elements and apply style.
```js
setTimeout(() => {debugger}, 3000);
```