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

```css
.portfolio {
  display: grid;
  height: 100%;
  grid-template-rows: repeat(6, 100px);
  grid-template-columns: repeat(6, 100px);
}
```
