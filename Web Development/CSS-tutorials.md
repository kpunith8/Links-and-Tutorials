## CSS - Cascading Style Sheets

### Stylesheet Origin

`User agent styles` - browser's default styles; they vary slightly from browser to browser,
but generally they do the same
things: headings `<h1> through <h6>` and paragraphs `<p>` are given a top and bottom
margin, lists `<ol> and <ul>`are given a left padding, and link colors and default
font sizes are set.

`Author styles` - User defined rules; User agent styles have lower priority,
so author styles override them.

## Styling Text

Use `line-height: 1.4` instead of using pixels it will auto adjust with `font-size`.

`font-style` can be `oblique, italic, etc.`.

`font-weight` can be `bold, bolder, light, etc.`.

`text-align` can be `left, right, center, and justify` (Don't use `justify` often).

`text-decoration` can be `line-through` for striking through words, `underline`, `overline`.

`text-transform` can be `capitalize` capitalizes the first letter of the words,  
`uppercase, lowercase, full-width, etc.`.

## Styling Links

Available pseudo-classes on `a` tag and it should follow the below order.

`a:link` normal link, add `text-decoration: none` to remove the default
  underline added to the links.

`a:visited` link visited, font, color of the link can be changed.

`a:hover` on hover, color, font of the link can be changed.

`a:active` while clicking on the link.

`a:focus` can be added for accessibility purpose, can be given color, when tabbed.

## Styling Lists

`list-style-type` to specify the list style instead of default bullet or
numbering, can be `circle, decimal, lower-alpha, lower-greek, none` etc.

`list-style-image` to specify the list style image instead of default bullet or other styles.

`list-style-position` to specify the list style to be part of the text and
show them along with the list, when list text is center aligned style of the
list never moves, set this property to `inside` to show along with list item

## Floats and Clears

`float` to specify elements to stick to specific region, allowing space to be
utilised for other stuff, can be `left, right`

For eg: Adding image and an paragraph after it, adding image a `float: left`
will wrap the text in paragraph with the image by moving image to the left,
only text inside a paragraph wraps around the image, not applies to `div's`
they will overlap.

Adding `clear: both` to `p` removes the wrapping with image.

## Display properties

### block

- `div`, `p` elements are `block` by default, which takes up the whole width. They can have
`width`, `height`, `margin`, and `padding` properties

### inline 

- `span`, `button` elements are `inline` by default, which takes minimal space possible.
multiple spans can sit in a same line. 
- They cannot have `width` and `height` properties to set the height and width. To set these properties set the `display: inline-block`
- `inline` elements can have only `left and right, padding and margin` not the top and bottom

### inline-block

- `img` tag by default has `display: inline-block`, they respect the height, width, margin and padding and the content around moves

### none

- `none` property makes a `div` or any elements disappear from the DOM.

## CSS Variables

Property with `--` before the property `--themeColor`
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

To override the css variable within `@media` need to declare within `:root` selector
```css
@media screen and (max-width: 760px) {
  :root {
    --layout: 1fr;
  }
}
```

Access the css variables in JavaScript
```javascript
let root = document.querySelector(':root');

// assume that the <span style="background: red;" />
root.style.setProperty('--themeColor', e.target.style.background);
```

### Chrome dev summit - 2019 (Next generation web styling)

`:focus-within`

`@media(prefers-reduced-motion: reduce/no-preference) {}` - go to rendering section in
`chrome dev tools -> Rendering -> Emulate CSS media feature` select `prefers-reduced-motion`

`@media(prefers-color-scheme: no-preference/light/dark) {}` - adopt your UI,
can be found in dev-tools under `Rendering section`

Logical properties - to adjust language specific styles, `rtl`, `ltr`

Use `block-size` instead of `height` and use `inline-size` instead of `width`

Use `margin-inline-start` instead of `margin-left`

Use `border-block-start`, `margin-block-start` instead of `border-top` and
`margin-top` respectively

`position: sticky; top: 0` to make it stick

`backdrop-filter` - to add filter to text on top of the image

`:is()`
```css
button:is(.focus, :focus) { /* instead of, button.focus, button:focus */
}

article > :is(h1, h2, h3, h4) { /* instead of article > h1, article > h2 */
}
```

`gap` for `flex-box`

CSS custom properties
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

Get the computed style directly, on an element
```
const h1 = document.querySelector('h1')
h1.computedStyleMap().get('font-size')
```

## Flexbox

Examples cover all the samples, `responsive nav bar` and `image gallery`
[CodePen Samples](https://codepen.io/kpunith8/pen/dyGWxrx)

Flex is a `block element` and takes all the available space
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

Main axis is `horizontal`, and cross axis is `vertical` by default, which is controlled by,
the property, `flex-direction: column` will change the
main axis as `vertical`

Align the `items` in the main axis, `justify-content`, default is, `flex-start`

Align the `single item` along the main axis, use `margin-left/right: auto`

To make responsive flex items, use `flex` property with value `1`, it has 3 values, `flex-grow`, `flex-shrink`, and `flex-basis`
all values setting to 1
```css
.search {
  flex: 1; /* No need to add, flex: 1; to container > div, here home and search are fixed and search shrinks/expands */
}
```

`Align Items - Cross axis`: `align-items: stretch`, container should have the height prop, target `specific item`,
`align-self: flex-start`

Wrapping: `flex-wrap: nowrap` - if the available space is less, then items will move to next line, when the items have a explicit `width: 300px`

Order: Move the items regardless of how items are laid out, `order: 1`

## Grid Layout

Example code at: [Code Sandbox](https://codesandbox.io/s/l2yjm5z6l9)

Two dimensional layouts - `Rows` and `Columns`

The height of the row is defined by the content

Use `fraction units(fr)` for responsiveness

`auto-fill` - Won't create tracks out of empty space,  and `auto-fit` - does,
  can be used with `grid-template-columns: repeat(auto-fill, 100px)`

`minmax()` - works with `auto-fill` and `auto-fit` `eg:`
  `grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))`

Named lines: Naming grid areas creates named lines, useful when
using `grid-row` or `grid-column` specifying row/column begin/end
`eg:` `grid-column: content-start / content-end` - here `content` is
the grid-area name given

Alignment properties: There are six

`justify-*` - For row axis - Horizontal
`align-*` - For column axis - Vertical

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

## Animations

## Debugging

Get the computed style of an element - in dev tools
```js
const h1 = document.querySelector('h1')
window.getComputedStyle(h1).getPropertyValue('font-size')
```

## References

- Kevin Powell - Youtube channel

- [CSS auto prefixer for cross browser compatibility](http://www.autoprefixer.github.io)

- [CSS font stack](https://www.cssfontstack.com/)

- [Chrome developers summit@2019](https://css-at-cds.netlify.com/)

- [CSS References, cool stuff](https://tympanus.net/codrops/css_reference/)

## CSS features

- [counter-increment](https://www.w3schools.com/cssref/pr_gen_counter-increment.asp)
