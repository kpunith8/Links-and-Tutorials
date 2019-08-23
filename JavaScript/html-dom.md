## DOM API

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

#### Make a navbar stick to the top of the screen

```html
<style>
#navbar {
  display: flex;
  overflow: hidden;
  background-color: #333;
}

#navbar a {
  color: #f2f2f2;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 27px;
}

.sticky {
  position: fixed;
  top: 0; /* must set to top */
  width: 100%
}
</style>

<body onscroll="myFunction()">
<div id="navbar">
  <a class="active" href="javascript:void(0)">Home</a>
  <a href="javascript:void(0)">News</a>
  <a href="javascript:void(0)">Contact</a>
</div>
<div>
Some content
<div>

<script>
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    } else {
    navbar.classList.remove("sticky");
}
</script>
```

#### className

- The className property sets or returns the class name of an element.

- To apply multiple classes, separate them with spaces, like "test demo"

```javascript
document.getElementById("myDIV").className = "mystyle other-style";

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

#### tabIndex - The `tabIndex` property sets or returns the value of the tabindex attribute of an element.

### window.history  

```javascript
window.history.back(); // to goback one page
// forward() next page
// go(num) // go to specified number of pages, -ve means backward, +ve means forward
```

### window.location   

- The location object contains information about the current URL.
The location object is part of the window object and is accessed through the window.location property.

```javascript
location.hash; // sets/returns anchor part of a URL, http://www.example.com/test.htm#part2, returns #part2

location.host; // sets/returns the host name

location.href; // sets/returns the entire URL

location.origin; // Return the protocol, hostname and port number of a URL.
// Assume that the current URL is https://www.w3schools.com:4097/test.htm#part2
// the result will be, https://www.w3schools.com:4097

location.pathname; // sets/returns the path name of the URL

location.port; // sets/returns the port that server uses

location.protocol; // sets/returns the protocol of the current URL

location.search; // Return the query string part of a URL.
// Assume that the current URL is https://www.w3schools.com/submit.htm?email=someone@example.com
// The result of x will be: ?email=someone@example.com

location.assign("www.xyz.com"); // Loads a new document.

location.reload(); //  reload the current document.

location.replace("www.xyz.com"); // Replaces the current document with a new one.
```

### Navigator object - contains information about the browser.

```javascript
navigator.appCodeName; // Get the code name of your browser, Mozilla

navigator.appName; // Get the app name

navigator.appVersion; // version of the browser

navigator.cookieEnabled; // specifies whether cookies are enabled in the browser.

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
}

navigator.onLine; // specifies whether the browser is in online or offline mode.

navigator.javaEnabled(); // specifies whether the browser has Java enabled.
```

### screen  

```javascript
screen.availHeight; // returns the hieght of the user's screen, in pixels, minus interface features like the Windows Taskbar.

screen.availWidth; // returns the width of the user's screen, in pixels, minus interface features like the Windows Taskbar.

screen.height;
screen.width;
screen.pixelDepth;
screen.colorDepth;
```
