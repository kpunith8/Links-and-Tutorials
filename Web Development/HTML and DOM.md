### DOM Element

#### classList

- The `classList` property returns the class name(s) of an element, as a `DOMTokenList` object.

- This property is useful to `add`, `remove` and `toggle` CSS classes on an element.

- The `classList` property is `read-only`, however, you can modify it by using the `add()` and `remove()` methods.

```javascript
document.getElementById("myDIV").classList.add("mystyle", "another-style");

// prints mystyle and another-style class names
const classes = document.getElementById("myDIV").classList;

// Toggle the class name of a div
document.getElementById("myDIV").classList.toggle("newClassName");

// remove() and contains(class) method can also be applied on classList

// returns mystyle
// .length property can be used to get the number of classes
document.getElementById("myDIV").classList.item(0);
```

#### className

- The `className` property sets or returns the class name of an element.

- To apply multiple classes, separate them with spaces, like "test demo"

```javascript
document.getElementById("myDIV").className = "mystyle other-style";
// or
document.getElementById("myDIV").classList.add('sample-class')

// return the class name
const divClass = document.getElementById("myDIV").className;
```

#### clientHeight, clientWidth, clientTop, and clientLeft

- The `clientHeight` property returns the `viewable height` of an element in `pixels`,
including `padding`, but not the border, scrollbar or margin.

- The reason why the `viewable` word is specified, is because if the element's content is taller
than the actual height of the element, this property will only return the height that is visible.

- The `clientLeft` property returns the width of the left border of an element, in pixels.
This property does not include the element's `left padding` or the `left margin`.

- The `clientTop` property returns the width of the top border of an element, in pixels.
This property does not include the element's `top padding` or `top margin`.

```javascript
var elmnt = document.getElementById("myDIV");
let height =  elmnt.clientHeight;
let width = elmnt.clientWidth;
let left = elmnt.clientLeft;
let top = elmnt.clientTop;
```

#### cloneNode()

- The `cloneNode()` method creates a copy of a node, and returns the clone.
The cloneNode() method clones `all attributes` and their `values`.

- Set the deep parameter value to `true` if you want to `clone all descendants` (children), otherwise false.

```javascript
// Adds Milk item to MyList1 by cloning
<ul id="myList1"><li>Coffee</li><li>Tea</li></ul>
<ul id="myList2"><li>Water</li><li>Milk</li></ul>

var itm = document.getElementById("myList2").lastChild;
var cln = itm.cloneNode(true); // false will add an empty <li> element
document.getElementById("myList1").appendChild(cln);
```

#### contentEditable

- The `contentEditable` property sets or returns whether the content of an element is editable or not.

```javascript
document.getElementById("myP").contentEditable = "true";
```

#### getAttribute(attrName)

- The `getAttribute()` method returns the value of the attribute with the specified name, of an element.

```javascript
var x = document.getElementById("myAnchor").getAttribute("target");
```

#### getAttributeNode(attrName)

- The `getAttributeNode()` method returns the attribute node with the specified name of an element, as an Attr object.

```javascript
var elmnt = document.getElementsById("id");
var attr = elmnt.getAttributeNode("class").value;
```

#### scrollIntoView()

- The `scrollIntoView()` method scrolls the specified element into the visible area of the browser window.

```javascript
var elmnt = document.getElementById("content");
elmnt.scrollIntoView();
```

#### setAttribute(attributename, attributevalue)

- The `setAttribute()` method adds the specified attribute to an element, and gives it the specified value.

```javascript
let btnInput = document.querySelector('.input1');
btnInput.setAttribute("type", "button");

document.getElementById("myAnchor").setAttribute("href", "https://www.w3schools.com");
```

#### style

- The `style` property returns a `CSSStyleDeclaration` object, which represents an element's style attribute.

- The style property is used to get or set a specific style of an element using different CSS properties.
style names were used as camel case.

- https://www.w3schools.com/jsref/dom_obj_style.asp

```javascript
element.style.backgroundColor = "red";
```

-  The `tabIndex` property sets or returns the value of the tab index attribute of an element.

### Events

- Adding events to the DOM
  ```javascript
  let btn = document.getElementById('btn');
  // click listener
  btn.addEventListener('click', function() {
    console.log('btn clicked');
  });

  // Checking for whether Ctrl+C is pressed
  btn.addEventListener("keypress", function() {
    if(event.keyCode == 32 && event.ctrlKey) {
      console.log('Ctrl+C pressed');
    }
  })
  ```

### Coordinates of an Event

- The `event.screenX` and `event.screenY `properties show the `number of pixels` from
  the left and top of the screen respectively `where the event took place`.

- The `event.clientX` and `event.clientY` properties show the `number of pixels` from
  the left and top of the `client that is being used` (usually the browser window).

- The `event.pageX` and `event.pageY` properties `show the coordinates` (in pixels)
  where the event took place from the left and top of the document respectively.
  This property takes account of whether the page has been scrolled.

- `event.which` returns which mouse button or key was pressed

- The `event.shiftKey`,` event.ctrlKey`, `event.altKey`, and `event.metaKey` are all
  properties of the event object and return `true` if the `relevant key is held down`
  when the event occurred.

### Forms
- Sample search page with a form

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Search</title>
</head>
<body>
  <form name="search" action="search">
    <input type="text" name="searchBox">
    <button type="submit">Search</button>
  </form>
</body>
<html>
```

- The `action` attribute is the `URL` that the form will be submitted to so
  that it can be processed on the server side

#### Accessing Form Elements

```javascript
// Use any of these methods to access the form
let form = document.forms[0];

let form = document.getElementsByTagname('form')[0]

// using name attribute
let form = document.forms.search; // document.forms['search']

// form controlls can be accessed using
let inputElement = form.elements[0]
let submitButton = form.elements[1]

// or can be accessed using the name attribute
let inputElement = form['searhBox']
```

#### Form properties and methods

- The `form.submit()` method will submit the form `automatically`.

  - A form can be `submitted manually` by the user employing a `button or input`
    element with a `type attribute` of `submit`, or even an input element
    with a `type attribute of image`

- The `form.reset()` method will `reset` all the form controls back to their
  initial values specified in the HTML

  - A `button` with the `type attribute` of `reset` can also be used to do this
    without the need for additional scripting

## Browser Object Model - BOM

- `window.alert()`, `window.confirm()`, `window.prompt()`

### window.navigator

- contains information about the browser.

```javascript
// returns the information about the browser, OS
navigator.userAgent

// Get the code name of your browser, Mozilla
navigator.appCodeName

// Get the app name
navigator.appName

// Get the app name
navigator.appVersion

// specifies whether cookies are enabled in the browser.
navigator.cookieEnabled;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
}

// specifies whether the browser is in online or offline mode.
navigator.onLine

// specifies whether the browser has Java enabled.
navigator.javaEnabled();
```

### window.location

- Object that contains information about the `URL of the current page`

```javascript
// property is an object that contains information about the URL of the current page
window.location

// returns the full URL as string
window.location.href

// returns the string describing the protocol used
window.location.protocol

// returns the host
window.location.host

// returns the port used
window.location.port

// returns a string of the path that follows the domain
window.location.pathname

// returns a string that starts with a `?` followed by the query string parameters
window.location.search

 // returns a string that starts with a `#` followed by the fragment identifiers
window.localtion.hash

// returns a string that shows the protocol and domain where the current page originated from
window.location.origin

/* Methods */
// can be used to force a reload of the current page
window.location.reload()

// can be used to load another resource from a URL provided as a parameter
window.location.assign("http://www.sitepoint.com/")

//  This method is almost the same as the window.location.assign() method,
// except that the current page will not be stored in the session history,
// so the user will be unable to navigate back to it using the back button.
window.location.replace()
```

### window.history

- Used to access information about any previously visited pages in the current browser session.
