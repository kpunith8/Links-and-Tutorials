## CSS Basics:
### Stylesheet origin

- user agent styles: browser's default styles; they vary slightly from browser to browser,
  but generally they do the same
  things: headings `<h1> through <h6>` and paragraphs `<p>` are given a top and bottom
  margin, lists `<ol> and <ul>`are given a left padding, and link colors and default
  font sizes are set.

- `author styles` - User defined rules; User agent styles have lower priority,
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

### focus and hover

- 

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

## CSS Grid Layout:

- Example code at: [Code sandbox](https://codesandbox.io/s/l2yjm5z6l9)

- Two dimensional layouts - Rows and Columns

- The height of the row is defined by the content

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


## conditional rendering in emotion styled components

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

## Debugging

- Get the computed style of an element - in dev tools

```
const h1 = document.querySelector('h1')
window.getComputedStyle(h1).getPropertyValue('font-size')
```

### References

- Kevin Powell - youtube channel
- http://www.autoprefixer.github.io
- [CSS font stack](https://www.cssfontstack.com/)
- [CSS at Chrome developers summit](https://css-at-cds.netlify.com/)
