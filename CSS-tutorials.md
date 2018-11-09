## CSS Basics:
### Stylesheet origin

  - user agent styles - browser's default styles; they vary slightly from browser to browser, but generally they do the same
    things: headings (<h1> through <h6>) and paragraphs (<p>) are given a top and bottom
    margin, lists (<ol> and <ul>) are given a left padding, and link colors and default
    font sizes are set.

  - author styles - User defined rules; User agent styles have lower priority, so author styles override them.


# CSS Basics: Kevin Powell

## Styling Text:

- use `line-height: 1.4` instead of using pixels it will auto adjust with `font-size`.
- `font-style` can be `oblique, italic, etc.`.
- `font-weight` can be `bold, bolder, light, etc.`.
- `text-align` can be `left, right, center, and justify` (Don't use `justify` often).
- `text-decoration` can be `line-through` for striking through words, `underline`, `overline`.
- `text-transform` can be `capitalize` capitalizes the first letter of the words,  `uppercase, lowercase, full-width, etc.`.

## Styling Links:
- Available pseudo-classes on `a` tag and it should follow the below order.
  - `a:link` normal link, add `text-decoration: none` to remove the default underline added to the links.
  - `a:visited` link visited, font, color of the link can be changed.
  - `a:hover` on hover, color, font of the link can be changed.
  - `a:active` while clicking on the link.
  - `a:focus` can be added for accessibility purpose, can be given color, when tabbed.

## Styling Lists:

- `list-style-type` to specify the list style instead of default bullet or numbering, can be `circle, decimal, lower-alpha, lower-greek, none` etc.
- `list-style-image` to specify the list style image instead of default bullet or other styles.
- `list-style-position` to specify the list style to be part of the text and show them along with the list, when list text is center
aligned style of the list never moves, set this property to `inside` to show along with list item

## Floats and Clears:

- `float` to specify elements to stick to specific region, allowing space to be utilized for other stuff, can be `left, right`
  - for ex: Adding image and an paragraph after it, adding image a `float: left` will wrap the text in paragraph with the image by moving image to the left, only text inside a paragraph wraps around the image, not applies to `div's` they will overlap.
  - adding `clear: both` to `p` removes the wrapping with image.

### How to keep content of the website to center - responsive:

- set `margin-left and margin-right` properties to `auto` or `margin: 0 auto` and set the `width: 70%`, so that it keeps the same size and auto adjusts with the screen size, adding `max-width: 1000px` will stop resizing after it reaches 1000px.

## Links

- https://www.cssfontstack.com/

## CSS Grid Layout:

- Example code at: https://codesandbox.io/s/l2yjm5z6l9

- Two dimensional layouts - Rows and Columns

- The height of the row is defined by the content

- `auto-fill` - Won't create tracks out of empty space,  and `auto-fit` - does, can be used with `grid-template-columns: repeat(auto-fill, 100px)`

- `minmax()` - works with `auto-fill` and `auto-fit` `eg:` `grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))`

- Named lines: Naming grid areas creates named lines, useful when using `grid-row` or `grid-column` specifying row/column begin/end
  `eg:` `grid-column: content-start / content-end` - here `content` is the grid-area name given

- Alignment properties: There are six
  - `justify-*` - For row axis - Horizontal
  - `align-*` - For column axis - Vertical

  ```css
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
  ```

  ### References
  - http://www.autoprefixer.github.io
