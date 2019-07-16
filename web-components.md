## Web-Components
- Style encapsulation
- Fewer dependencies and prerequisites
- Framework or library agnostic
- Longer life components

### Specification
- Custom elements
- Shadow DOM
- HTML templates
- HTML imports

### Custom Elements
- Lets you define your own interface with its own methods and properties.
- DOM elements
- Create your own component
- Add custom properties, methods, and functionality
- Extend native elements and custom elements
```javascript
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    console.log('Custom element created');
  }
}
window.customElements.define('custom-element', MyCustomElement);
```

- Life cycle methods of a web components
  - `connectedCallback()` - triggered when an element is added to the DOM.

  - `attributeChangedCallback(name, oldValue, newValue)` - Allows to subscribe to changes in certain attributes on an element instance, to get these attributes call static method
    ```javascript
    static get observedAttribues() {
      return ["demo"];
    }
    ```

  - `disconnectedCallback()` - triggered when an element is removed from DOM.

### Shadow DOM
- sub-DOM tree attached to a DOM element.
- Provides true encapsulation to elements.
- 2 types of Shadow DOM, `open` - complete control on sub-DOM tree, `closed` - not possible to control once created.
```javascript
<script>
  let div = document.getElementById('simple-div');
  div.attachShadow({mode: 'open'});
  div.shadowRoot.innerHTML = `
    <style>
      p {
        color: blue;
      }
    </style>
    <p>Paragraph inside a shadow DOM</p>
  `;
</script>
```

### HTML Templates
- Ability to create reusable segments of HTML within apps.
- The `<template>` element is not automatically rendered by the browser.
- Can be used to define markup for specific segments of an application and rendered on-the-fly as required.
