## React Testing Library

### Submit a form

- https://github.com/testing-library/react-testing-library/issues/54

```js
const {container, fireEvent} = render(<App/>)

const form = container.querySelector('form');

fireEvent.submit(form);
```


### Test a tooltip on hover over

```js
const showInfoTip = async infoTip => {
  // This depends on implementation details of your tooltip,
  // it can directly be attached to the infoTip element
  const infoTipTrigger = infoTip.querySelector('div')
  fireEvent.mouseEnter(infoTipTrigger)

  let toolTip

  await waitFor(() => {
    // can be accessed by a class name, if you have aria-describedby attr, follow this
    const toolTipId = infoTipTrigger.getAttribute('aria-describedby')

    // It attaches the tooltip outside the dom, because it was built with react portal.
    toolTip = global.document.querySelector(`#${toolTipId}`)

    expect(toolTip).to.not.be.null // verify that toolTip exist before returning
  })

  return toolTip
}

// Usage in the test file
const infoTip = await showInfoTip(find('.name-tooltip'))
// assertions depends your tooling
expect(infoTip.textContent).to.include('Hello There')
```

### Expand the react-select

```js
export const expandSelect = selectInput => {
  if (_.toLower(selectInput.tagName) !== 'input') {
    selectInput = selectInput.querySelector('input')
  }

  fireEvent.mouseDown(selectInput)
  fireEvent.focus(selectInput)
}
```


## RTL- Testing library

- Fire `onChange` event on input field
```javascript
fireEvent.click(find('.add-item-link'))
fireEvent.change(find('input[name="label"]'), {
  target: {value: 'new lbl'}
})
// or
fireEvent.change(find('input[type="text"][name="package_name"]'), {
  target: {value: 'com.android'}
})
fireEvent.click(find('.save-button'))
```
