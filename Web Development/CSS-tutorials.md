## CSS

### Stylesheet origin

- `User agent styles` - browser's default styles; they vary slightly from browser to browser,
  but generally they do the same
  things: headings `<h1> through <h6>` and paragraphs `<p>` are given a top and bottom
  margin, lists `<ol> and <ul>`are given a left padding, and link colors and default
  font sizes are set.

- `Author styles` - User defined rules; User agent styles have lower priority,
  so author styles override them.

## Styling Text:

- use `line-height: 1.4` instead of using pixels it will auto adjust with `font-size`.

- `font-style` can be `oblique, italic, etc.`.

- `font-weight` can be `bold, bolder, light, etc.`.

- `text-align` can be `left, right, center, and justify` (Don't use `justify` often).

- `text-decoration` can be `line-through` for striking through words, `underline`, `overline`.

- `text-transform` can be `capitalize` capitalizes the first letter of the words,  
  `uppercase, lowercase, full-width, etc.`.

## Styling Links:

- Available pseudo-classes on `a` tag and it should follow the below order.

  - `a:link` normal link, add `text-decoration: none` to remove the default
    underline added to the links.
  - `a:visited` link visited, font, color of the link can be changed.

  - `a:hover` on hover, color, font of the link can be changed.

  - `a:active` while clicking on the link.

  - `a:focus` can be added for accessibility purpose, can be given color, when tabbed.

## Styling Lists:

- `list-style-type` to specify the list style instead of default bullet or
  numbering, can be `circle, decimal, lower-alpha, lower-greek, none` etc.

- `list-style-image` to specify the list style image instead of default bullet or other styles.

- `list-style-position` to specify the list style to be part of the text and
  show them along with the list, when list text is center aligned style of the
  list never moves, set this property to `inside` to show along with list item

## Floats and Clears:

- `float` to specify elements to stick to specific region, allowing space to be
  utilised for other stuff, can be `left, right`

  - for ex: Adding image and an paragraph after it, adding image a `float: left`
    will wrap the text in paragraph with the image by moving image to the left,
    only text inside a paragraph wraps around the image, not applies to `div's`
    they will overlap.

  - adding `clear: both` to `p` removes the wrapping with image.

### How to keep content of the website to center - responsive:

- set `margin-left and margin-right` properties to `auto` or `margin: 0 auto`
  and set the `width: 70%`, so that it keeps the same size and auto adjusts with
  the screen size, adding `max-width: 1000px` will stop resizing after it reaches 1000px.

### Select checked checkbox with custom label

- Immediate label after a checkbox with a class name `custom-checkbox`
  ```css
  [type="checkbox"]:checked + label .custom-checkbox {
    background: grey;
  }
  ```

### display property

- `div` by default has `display: block` which takes up the whole line.

- `span` by default has `display: inline` which takes minimal space possible.
  multiple spans can sit in a same line. They `cannot` have `width` and `height` properties
  to set the height and width. To set these properties set the `display: inline-block`

- `img` tag buy default has `display: inline-block`

- `display: none` property makes a `div` or any elements disappear from the dom.

## CSS - Variables

- property with `--` before the property `--themeColor`
  ```css
  /* To apply these variables to the whole page
     Declare them under :root selector */
  :root {
    --themeColor: #3e84da;
    --layout: 1fr 1fr;
  }

  .banner {
    background: var(--themeColor) /* Using the --themeColor custom css property */
  }
  ```

- To override the css variable within `@media` need to declare within `:root` selector
  ```css
  @media screen and (max-width: 760px) {
    :root {
      --layout: 1fr;
    }
  }
  ```

- Access the css variables in JavaScript
  ```javascript
  let root = document.querySelector(':root');

  // assume that the <span style="background: red;" />
  root.style.setProperty('--themeColor', e.target.style.background);
  ```

### Chrome dev summit - 2019 (Next generation web styling)

- `:focus-within`

- `@media(prefers-reduced-motion: reduce/no-preference) {}` - go to rendering section in
  `chrome dev tools -> Rendering -> Emulate CSS media feature` select `prefers-reduced-motion`

- `@media(prefers-color-scheme: no-preference/light/dark) {}` - adopt your UI,
  can be found in dev-tools under `Rendering section`

- Logical properties - to adjust language specific styles, `rtl`, `ltr`

  - Use `block-size` instead of `height` and use `inline-size` instead of `width`

  - Use `margin-inline-start` instead of `margin-left`

  - Use `border-block-start`, `margin-block-start` instead of `border-top` and
    `margin-top` respectively

- `position: sticky; top: 0` to make it stick

- `backdrop-filter` - to add filter to text on top of the image

- `:is()`
  ```css
  button:is(.focus, :focus) { /* instead of, button.focus, button:focus */
  }

  article > :is(h1, h2, h3, h4) { /* instead of article > h1, article > h2 */
  }
  ```

- `gap` for `flex-box`

- `CSS custom properties`
  ```
  CSS.registerProperty({
    name: `--colorPrimary`,
    syntax: color,
    inherits: true,
    initialValue: deeppink
  })

  /* Can be replaced with */
  @property --colorPrimary {
    syntax: color; /* other props */
  }
  ```

- Get the computed style directly, on an element
  ```
  const h1 = document.querySelector('h1')
  h1.computedStyleMap().get('font-size')
  ```

## Tricks

- Show the border of each element in a page to see how they are organized
  ```css
  /* Select all elements and set the border */
  * {
    border: 1px solid yellow;
  }
  ```

- it makes border moves the UI by pixel size, instead use `outline` property to inspect

## Sample Examples

#### Make a navbar stick to the top of the screen

```html
<!DOCTYPE html>
<html>
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
</body>
</html>
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
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
    in culpa qui officia deserunt mollit anim id est laborum.

    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
    in culpa qui officia deserunt mollit anim id est laborum.
  </p>
</body>
<style>
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
</style>

<script type="text/javascript">
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
</script>
```

## CSS Flexbox

- Examples cover all the samples, `responsive nav bar` and `image gallery`
  [CodePen Samples](https://codepen.io/kpunith8/pen/dyGWxrx)

- Flex is a `block element` and takes all the available space
  ```html
  <div class="container">
    <div class="home">Home<div>
    <div class="about">About<div>
    <div class="search">Search<div>
  </div>

  <style>
  .container {
    display: flex; /* Default flex axis is row */
    flex-direction: column; /* Change the main axis */
    justify-content: space-around; /* Align along the main axis */
  }

  .logout {
    margin-left: auto; /* To move the logout to right, remove justify-content prop on container */
  }

  .home {
    margin-right: auto; /* Push home to left, add justify-content: flex-end */
  }

  .container > div {
    flex: 1; /* All the divs will fill the remaining space and shrink/expand as container changes */
    /* takes 3 values, flex-grow flex-shrink flex-basis */
  }

  .container > .search { /* Need to target .container, while querying, because of specificity rules */
    flex: 2; /* To make search to take up the double the space of other items */
  }
  </style>
  ```

- Main axis is `horizontal`, and cross axis is `vertical` by default, which is controlled by,
  the property, `flex-direction: column` will change the
  main axis as `vertical`

- Align the `items` in the main axis, `justify-content`, default is, `flex-start`

- Align the `single item` along the main axis, use `margin-left/right: auto`

- To make responsive flex items, use `flex` property with value `1`, it has 3 values, `flex-grow`, `flex-shrink`, and `flex-basis`
  all values setting to 1
  ```css
  .search {
    flex: 1; /* No need to add, flex: 1; to container > div, here home and search are fixed and search shrinks/expands */
  }
  ```

- `Align Items - Cross axis`: `align-items: stretch`, container should have the height prop, target `specific item`,
  `align-self: flex-start`

- Wrapping: `flex-wrap: nowrap` - if the available space is less, then items will move to next line, when the items have a explicit `width: 300px`

- Order: Move the items regardless of how items are laid out, `order: 1`

## CSS Grid Layout:

- Example code at: [Code Sandbox](https://codesandbox.io/s/l2yjm5z6l9)

- Two dimensional layouts - Rows and Columns

- The height of the row is defined by the content

- use fraction units for responsiveness

- `auto-fill` - Won't create tracks out of empty space,  and `auto-fit` - does,
  can be used with `grid-template-columns: repeat(auto-fill, 100px)`

- `minmax()` - works with `auto-fill` and `auto-fit` `eg:`
  `grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))`

- Named lines: Naming grid areas creates named lines, useful when
  using `grid-row` or `grid-column` specifying row/column begin/end
  `eg:` `grid-column: content-start / content-end` - here `content` is
  the grid-area name given

- Alignment properties: There are six

  - `justify-*` - For row axis - Horizontal
  - `align-*` - For column axis - Vertical

  ```css
  .flex-box {
    /* Keeps the grids to center */
    /* Also can be start, end, space-between, space-around */
    justify-content: center;
    /* To justify the content inside */
    /* stretch - by default; start, end, use, justify-self: end; on grid item */
    justify-items: end;
    /* stretch; by default, center, start, end, space-around, space-between*/
    align-content: center;
    /* Align items vertically */
    /* stretch - by default; start, end, use, justify-self: end on grid item, base-line */
    align-items: center;
  }
  ```

## CSS Animations

- 

### Animating a square

```css
#square {
  margin: 100px;
  width: 100px;
  height: 100px;
  background: #cc0;
  animation: spin1 4s linear infinite;
}

@keyframes spin1 {
  from {
    transform:rotate(360deg);
  }
  to {
    transform:rotate(0deg);
    }
  }
```

## ::before and ::after pseudo selectors

- `content` can be specified with `open-quote` or `close-quote` property to
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

- `counter-reset, counter-increment, counter-decrement` special properties
  - Give a name to a `div` with `counter-reset: section-counter`, can be used to
    increment the counter by 1 or any number

- Use `::before` pseudo selector to add the counter to each section for each h1 elements
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

## codepen.io examples

### Add image overlay and heading style

- https://codepen.io/kevinpowell/pen/ZrMzre


### Animated progress bar

- https://codepen.io/kpunith8/pen/JjYmEre

## Align content to center of the page using flex box

```html
<html>
  <style>
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
  </style>

  <body>
    <div class="box">
      <div>Content to align center</div>
    </div>
  </body>
</html>
```

## Set custom property value using DOM API

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

## Emotion-UI - React styling

### conditional rendering in emotion styled components

```
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

## Debugging

- Get the computed style of an element - in dev tools

```js
const h1 = document.querySelector('h1')
window.getComputedStyle(h1).getPropertyValue('font-size')
```

### References

- Kevin Powell - Youtube channel
- [CSS auto prefixer for cross browser compatibility](http://www.autoprefixer.github.io)
- [CSS font stack](https://www.cssfontstack.com/)
- [Chrome developers summit@2019](https://css-at-cds.netlify.com/)
- [CSS References, cool stuff](https://tympanus.net/codrops/css_reference/)

#### CSS features

- [counter-increment](https://www.w3schools.com/cssref/pr_gen_counter-increment.asp)
