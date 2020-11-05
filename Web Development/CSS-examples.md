## CSS Examples

### Animating a square

```css
.square {
  margin: 100px;
  width: 100px;
  height: 100px;
  background: #cc0;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from {
    transform:rotate(360deg);
  }
  to {
    transform:rotate(0deg);
    }
  }
```

### ::before and ::after pseudo selectors

`content` can be specified with `open-quote` or `close-quote` property to
display quotes using `:before` and `::after` respectively.

### Tooltip with pseudo elements

```html
<p> This is a example <a href="#" data-tool-tip="I'm a tooltip">Wiki</a></p>
```

```css
a[data-tool-tip] {
  position: relative;
}

a[data-tool-tip]::after { /* can be ::before too */
  /* read the value from data-tool-tip attribute */
  content: attr(data-tool-tip);
  position: absolute;
  background-color: gray;
  padding: 1em 3em;
  color: white;
  border-radius: 5px;
  font-size: 0.8em;
  bottom: 0;
  left: 0;
  white-space: nowrap; /* no wrapping to keep the text as is */
  transform: scale(0);
  transition:
    transform ease-out 200ms, /* 2 transitions added on transform and bottom */
    bottom ease-out 200ms;
}

/* :hover should be before ::after or ::before pseudo selectors to work properly */
a[data-tool-tip]:hover::after {
  transform: scale(1);
  bottom: 100%;
}
```

### Give a number to sections with increment-counter

```html
<div class="counter">
  <h1 class="section one">
    <p>content</p>
  </h1>
  <h1 class="section two">
    <p>content</p>
  </h1>
  <h1 class="section three">
    <p>content</p>
  </h1>
</div>
```

`counter-reset, counter-increment, counter-decrement` special properties
Give a name to a `div` with `counter-reset: section-counter`, can be used to
increment the counter by 1 or any number

Use `::before` pseudo selector to add the counter to each section for each h1 elements
```css
*, *::before, *::after {
  box-sizing: border-box;
}

.counters {
  background: lightgray;
  text-align: left;
  padding: 8em 5em;
  margin-top: 5em;
  counter-reset: header-counter;
}

.section {
  position: relative;
}

.section::before {
  counter-increment: header-counter; /* The name of counter specified with counter-reset */
  content: counter(header-counter); /* can be any text in the content '. ' */
  position: absolute;
  top: 0.5em;
  left: -2.5em;
  background: white;
  height: 2em;
  width: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid gray;
  color: gray;
}
```

### How to keep content of the website to center - responsive:

Set `margin-left and margin-right` properties to `auto` or `margin: 0 auto`
and set the `width: 70%`, so that it keeps the same size and auto adjusts with
the screen size, adding `max-width: 1000px` will stop resizing after it reaches 1000px.
```css
body {
  margin: 0 auto;
  width: 70%; /* can be 70vw */
  max-width: 1000px;
}
```

### Align content to center of the page using flex box

```html
<div class="box">
  <div>Content to align center</div>
</div>
```

```css
body {
  margin: 0;
  padding: 0;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box div {
  width: 100px;
  height: 100px;
}
```

### Align the content and a div to center

```html
<div>
  <p>Lorem ipsum dolor sit amet</p>
</div>
<style>
  div {
    width: 80%;
    height: 100vh;
    text-align: center;
    background: teal;
    margin: 0 auto;
    line-height: 100vh;
  }
</style>
```

### Select checked checkbox with custom label

Immediate label after a checkbox with a class name `custom-checkbox`
```css
[type="checkbox"]:checked + label .custom-checkbox {
  background: grey;
}
```

### Make a navbar stick to the top of the screen

```html
<body onscroll="scroll()">
  <div id="navbar">
    <a class="active" href="javascript:void(0)">Home</a>
    <a href="javascript:void(0)">News</a>
    <a href="javascript:void(0)">Contact</a>
  </div>
  <div>
    Some content
  <div>

  <script>
    let navbar = document.getElementById("navbar");
    let sticky = navbar.offsetTop;

    function scroll() {
      if(window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
  </script>
<body>
```

```css
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
```

### Scroll aware navbar - Hide on scrollDown and show on scrollUp

```html
<body>
  <nav id="navbar">
    <ul>
      <li><a>Link1</a></li>
      <li><a>Link2</a></li>
      <li><a>Link3</a></li>
      <li><a>Link4</a></li>
    </ul>
  </nav>
  <p class="some-content">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
  </p>
</body>
```

```css
body {
  margin: 0;
  padding: 0;
}

.nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px; /* top: -80px on scroll */
  padding: 0 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  transition: 0.5s;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
}

ul li {
  list-style: none;
}

ul li a {
  color: blue;
  padding: 0 20px;
  font-weight: bold;
}
```

```js
let lastScrollTop = 0;
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset ||
    document.documentElement.scrollTop

    if(scrollTop > lastScrollTop) {
      navbar.style.top = "-80px";
    } else {
      navbar.style.top = 0;
    }

    lastScrollTop = scrollTop;
})
```

### Set custom property value using DOM API

```JavaScript
const root = document.documentElement;
root.style.setProperty("--header-color", "#23a");

:root {
  --header-color: #1ad83b;
}

// Usage
h1 {
  color: var(--header-color);
}
```

### Set background with overlay to the website

```css
body {
  background-image: url();
  background-color: #303030;
  background-blend-mode: multiply;
  background-size: cover;
  background-position: top;
}
```

### pointer-events - Disable click or any action on any element

```css
button {
  animation: fade 1s ease forwards;
}

@@keyframes fade {
  from {
    opacity: 1;
    pointer-events: all;
  }
  to {
    opacity: 0;
    pointer-events: none;
  }
}
```

### Change the selection style and first letter big

```css
p::selection {
  background-color: #333;
  color: white;
}

p::first-letter {
  font-size: 2rem;
  font-weight: bold;
}
```

### Jump to section on click and add smooth transition

```html
<div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
  <a href="#gallery">Jump to Gallery</a>
</div>
<section id="gallery">
  <p>Hi there</p>
</section>

<style>
  html {
    scroll-behavior: smooth;
  }

  div, section {
    height: 100vh;
  }
</style>
```

### Dark mode with filter: invert(1)

```css
.dark-mode {
  background: black;
  /* Use hue-rotate(180deg) to give link and other text colors to retain its original color
  in dark mode */
  filter: invert(1) hue-rotate(180deg);
}

p {
  color: white;
}
```

### Fix a font-size to relative pixel from rem

If you want `18px` as `1.8rem` which is technically means more, because 1rem is 16px,
it may translate to around 29px. Converting to rem to pixel would be cumbersome, hence
set `font-size` as `62.5%`. Which will increase the accessibility when the user changes
the font size, rem adapts to it
```css
html {
  font-size: 62.5%;
}

h1 {
  font-size: 2rem; /* translates to 20px */
}

p {
  font-size: 1.6rem; /* translates to 16px */
}

@media screen and (max-width: 700px) {
  html {
    font-size: 75%;
  }
}
```

### Gradient Text

```css
h2 {
  display: inline;
  font-size: 2rem;
  background: linear-gradient(to left, rgb(112, 101, 214), rgb(230, 106, 213));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Images - Lazy loading native CSS

Set image element attribute `<img loading="lazy" src="" />` default loading option `eager`
Set `height` and `width` properties to `img` when using `lazy` so that it leaves a
specified dimension until the image loads instead of jumps while displaying the content.

When specifying height and width make sure to have `height` property set to `auto`
or fixed height
```html
<img height="800" width="1024" loading="lazy" src="" alt=""/>
```

### Fit images without loosing the image

```css
.image {
  overflow: hidden;
  width: 100%;
  object-fit: cover;
  height: 400px; /* auto - to fit the image */
}
```

### Dynamic input field width based on editing content

Use `ch` unit to have the dynamic width
```js
<input style={{width: `${email.length}ch`}} value={value}/>
```

### Keep the second item in the flex row next to first element

```css
.box {
  display: flex;
}

.item-1 {
  width: '100%'
}

.item-2 {
  /* Pushes the item to left in the row */
  margin-right: auto;
}
```

## Tips

Show the border of each element in a page to see how they are organized
```css
/* Select all elements and set the border */
* {
  border: 1px solid yellow;
}
```
it makes border moves the UI by pixel size, instead use `outline` property to inspect

## codepen.io samples

[Add image overlay and heading style](https://codepen.io/kevinpowell/pen/ZrMzre)

[Animated progress bar](https://codepen.io/kpunith8/pen/JjYmEre)

[Align content in a row with equal space](https://codepen.io/kpunith8/pen/GRZzEqE)

## Emotion-UI - React styling

### Conditional rendering in emotion styled components

```css
const Tab = styled(Basic)`
${({isVisible, primary}) => isVisible && `
  font-size: 10px;
  text-transform: uppercase;
`};

const Tab = styled.button`
  width: 100%;
  outline: 0;
  border: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
  line-height: 0.2;

  ${({ active }) => active && `
    background: blue;
  `}
  <Tab active {...props} />
`;
```

### Pass props to styled component - object style

```javascript
const Card = styled('a')({
  border: '1px solid blue',

  },
  props => ({borderTop: props.isConnected ? '5px solid red' : null})
)
```
