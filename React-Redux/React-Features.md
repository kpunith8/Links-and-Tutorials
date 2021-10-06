## React basics - Lagacy code

- Mounting process has 4 lifecycle methods, invoked in the following order:

  - `constructor()` - Initial state declaration and binding of callback functions
    can be registered here, if you are using ES6
    arrow functions, then no need to bind callbacks in `constructor`

  - `static getDerivedStateFromProps(props, state)` - It is important to know that this is a static method and it doesn’t
    have access to the component instance.

  - `render()`

  - `componentDidMount()` - Asynchronous data fetch can be done here

- Update lifecycle of a component when the state or the props change, there are 5 lifecycle
  methods, in the following order:

  - `getDerivedStateFromProps()`

  - `shouldComponentUpdate(nextProps, nextState)`

  - `render()`

  - `getSnapshotBeforeUpdate(prevProps, prevState)`

  - `componentDidUpdate(prevProps, prevState, snapshot)`

- Unmounting lifecycle. It has only one lifecycle method

  - `componentWillUnmount()`

- `componentDidCatch(error, info)` used to catch errors in components.

- `dangerouslySetInnerHTML` - to set html to JSX

## React Hooks - 16.8

- Allows state management and life cycle management in functional components

- No need to write class, works only with functional components

### `useState` hook

```javascript
import React, { useState } from "react"

function Counter() {
  // Initializes the count variable with 0 and setCount is a callback to update the state on click
  // It provides 2 values, de-structure them to get the values
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

export default Counter
```

### Test a component written using hooks, using, `react-testing-library`

```javascript
import React from "react"
import { render, fireEvent } from "react-testing-library"
import Counter from "./Counter"

test("Counter increments the count", () => {
  const container = render(<Counter />)
  const button = container.firstChild

  // Initial value
  expect(button.textContent).toBe("0")

  // Simulate the click
  fireEvent.click(button)

  expect(button.textContent).toBe("1")
})
```

### Share logic across multiple components with custom hooks

```javascript
import React, { useState } from "react"

function useCounter(initialState, steps) {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + steps)

  return { count, increment }
}

function Counter() {
  const { count, increment } = useCounter(5, 2)

  return <button onClick={increment}>{count}</button>
}

export default Counter
```

### Store values to local storage with `useEffect` hook

- use `useEffect` hook acts like `CDM` and `CDU` life cycle methods, it runs every time state changes

```javascript
import React, { useState, useEffect } from "react"

function Counter() {
  const initialCount = () => Number(window.localstorage.getItem("count")) || 0
  const [count, setCount] = useState(initialCount)
  const [person, setPerson] = useState(null)

  useEffect(() => {
    window.localstorage.setItem("count", count)
  }, [count]) // To make sure to run this hook only when state changes

  // Passing empty array as second parameter to useEffect will load the data only the component loads for the
  // first time, like componentDidMount, specifying the state inside the array updates only when state updates
  // useEffect() can be async for eg:

  useEffect(async () => {
    const response = await window.fetch("url")
    const data = await response.json()
    const [item] = data.results // It depends on returned value from API

    setPerson(item) // Display person object in UI
  }, [])

  return <button onClick={() => setCount(count + 1)}>count</button>
}

export default Counter
```

## Using ref as callback

- Measure a DOM node

```js
function MeasureExample() {
  const [rect, ref] = useClientRect()
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null && (
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      )}
    </>
  )
}

function useClientRect() {
  const [rect, setRect] = useState(null)
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])
  return [rect, ref]
}
```

## Dependencies for useEffect, useMemo, and useCallback

- Dependencies are passed as second parameter in an array.

- This ensures that hooks doesn’t change between the re-renders, and so React won’t call it unnecessarily.

- `Don't omit the functions` from the list of dependencies

- Keeping the function outside of the hook needs `function to be passed as a dependency`
  if it depends on the prop

  ```js
  function Example({ someProp }) {
    function doSomething() {
      console.log(someProp)
    }

    useEffect(() => {
      doSomething()
    }, [doSomething]) // Passing empty array causes bugs
  }
  ```

- Best way is to declare functions needed by an effect inside of the hook.
  Then it’s easy to see what values from the component scope that effect depends on

  ```js
  function Example({ someProp }) {
    useEffect(() => {
      function doSomething() {
        console.log(someProp)
      }

      doSomething()
    }, [someProp])
  }
  ```

- Add a function to effect dependencies but `wrap its definition into the useCallback` Hook.
  This ensures it doesn’t change on every render unless its own dependencies also change

  ```js
  function ProductPage({ productId }) {
    // ✅ Wrap with useCallback to avoid change on every render
    const fetchProduct = useCallback(() => {}, [productId]) // ✅ All useCallback dependencies are specified

    return <ProductDetails fetchProduct={fetchProduct} />
  }

  function ProductDetails({ fetchProduct }) {
    useEffect(() => {
      fetchProduct()
    }, [fetchProduct]) // ✅ All useEffect dependencies are specified
  }
  ```

- Creating the initial state is expensive

  ```js
  function Table(props) {
    // createRows() is called on every render
    const [rows, setRows] = useState(createRows(props.count))
  }
  ```

- To avoid re-creating the ignored initial state, we can pass a `function to useState`

  ```js
  function Table(props) {
    // ✅ createRows() is only called once
    const [rows, setRows] = useState(() => createRows(props.count))
  }
  ```

- React will only call this function during the first render

### How to avoid passing callbacks down

- Pass down a `dispatch` function from `useReducer` via `context`

  ```js
  const TodosDispatch = React.createContext(null)

  function TodosApp() {
    // Note: `dispatch` won't change between re-renders
    const [todos, dispatch] = useReducer(todosReducer)

    return (
      <TodosDispatch.Provider value={dispatch}>
        <DeepTree todos={todos} />
      </TodosDispatch.Provider>
    )
  }
  ```

- Any child in the tree inside TodosApp can use the dispatch function to pass actions up to TodosApp:

  ```js
  function DeepChild(props) {
    // If we want to perform an action, we can get dispatch from context.
    const dispatch = useContext(TodosDispatch)

    function handleClick() {
      dispatch({ type: "add", text: "hello" })
    }

    return <button onClick={handleClick}>Add todo</button>
  }
  ```

### Handle out-of-order responses with a local variable inside the effect

```js
useEffect(() => {
  let ignore = false
  async function fetchProduct() {
    const response = await fetch("http://myapi/product/" + productId)
    const json = await response.json()
    if (!ignore) setProduct(json)
  }

  fetchProduct()
  return () => {
    ignore = true
  }
}, [productId])
```

### Modify and access DOM node with `useRef()` hook

```javascript
import React, { useRef, useEffect } from "react"
import VanillaTilt from "vanilla-tilt"

function Tilt(props) {
  const tiltRef = useRef()
  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 25,
      speed: 400,
      "max-glare": 0.5,
    })
    // Optional return statement in useEffect() to cleanup
    return () => tiltRef.current.vanillaTilt.destroy()
  }, [])

  return (
    <div ref={tiltRef} className={tilt - root}>
      <div className={tilt - chile}>{props.children}</div>
    </div>
  )
}
```

### Use `React.lazy()` and `Suspense`

```javascript
import React, { Suspense } from "react"

// Load the component lazily
const Tilt = React.lazy(() => import("./tilt")) // Dynamic import, imports the library when needed.

// It can be used with Suspense as follows
;<Suspense fallback={<div>Loading...</div>}>
  <Tilt />
</Suspense>
```

### useReducer hook to manage more than one state in a functional component

```javascript
import { useReducer } from "react"

// instead of using useState() hook for each state, consider, useReducer
const [state, setState] = useReducer(
  (state, newState) => ({ ...state, ...newState }),
  { isLoaded: false, fetching: false, data: null, error: null }
)
```

## Reusability

- Use composition over inheritance

### Children as a prop

```js
const Parent = () => {
  return (
    <ChildrenPattern>
      <h1>Test</h1>
      <div>Hi there</div>
    </ChildrenPattern>
    <ChildrenPattern>
      <h1>User Form</h1>
      <form>
        <input type="email" placeholder="Enter your email here"/>
        <br />
        <button type="submit">Submit</button>
      </form>
    </ChildrenPattern>
  )
}

// Any children passed to this component can have border around them
const ChildrenPattern = ({ children, ...props }) => {
  return (
    <div
      style={{ border: "1px solid blue", borderRadius: 5, padding: 10 }}
      {...props}
    >
      {children}
    </div>
  )
}
```

- Use children as prop if you want have different UI controls with similar styles
- If you have a image with a caption always better not to use Children as prop, its better
  to create a standalone reusable component

### Higher Order Components

- A component that takes a component as a prop as its first argument and returns a new component that wraps the given
  component, providing additional capabilities to the wrapped component.

```js
const HOC = (WrappedComponent) => props => {
  return (<WrappedComponent newProp='wrappedProp' {...props}>)
}

cont App = (props) => {
  return (
    <div>Hello {props.newProp}</div>
  )
}

export default HOCComponent(App)
```

- Toggler higher order component

```js
const Toggler = (Component, {defaultToggled}) => (props) => {
  const [isToggled, setToggled] = useState(defaultToggled)
  return (
    <Component
      on={isToggled}
      onToggle={() => setToggled(!isToggled)}
      {...props}
    />
  )
}

const Menu = ({ on, onToggle, ...props }) => {
  return <div onClick={onToggle} {...props}>Menu is {on ? "Visible" : "Hidden"}</div>
}

export default Toggler(Menu, {defaultToggled: true})

const FavoriteButton = ({ on, onToggle, ...props }) => {
  return <div onClick={onToggle} {...props}>Favorite is {on ? "On" : "Off"}</div>
}

export default Toggler(FavoriteButton, {defaultToggled: false})
```

### Render props

- Render props are a way to pass a component as a prop to another component.

```js
const App = () => {
  // Prop can be any name instead of render
  return (
    <Example render={name => <h1>Hey there, {name}</h1>}>
  )
}

const Example = ({ render, ...props }) => {
  return (
    <div>
      {render("Sarah")}
    </div>
  )
}
```

- Re-write toggler functionality with render prop

```js
const Toggler = ({render, defaultToggled, ...props}) =>{
  const [isToggled, setToggled] = useState(defaultToggled)
  return (
    <div>
      {render({on: isToggled, onToggle: () => setToggled(!isToggled), ...props})}
    </div>
  )
}

const Menu = ({ on, onToggle, ...props }) => {
  return (
    <Toggler render={({on, onToggle, ...props}) =>
      <div onClick={onToggle} {...props}>Menu is {on ? "Visible" : "Hidden"}</div>}
      defaultToggled
    />
}

const FavoriteButton = ({ on, onToggle, ...props }) => {
  return (
    <Toggler render={({onToggle, on, ...props}) =>
        <div onClick={onToggle} {...props}>Favorite is {on ? "On" : "Off"}</div>}
     defaultToggled={false}
    />
  )
}
```

- This also can be written as children component instead of render prop to the component

```js
const Toggler = ({ children, defaultToggled, ...props }) => {
  const [isToggled, setToggled] = useState(defaultToggled)
  return (
    <div>
      {children({
        on: isToggled,
        onToggle: () => setToggled(!isToggled),
        ...props,
      })}
    </div>
  )
}

const FavoriteButton = ({ on, onToggle, ...props }) => {
  return (
    <Toggler defaultToggled={false}>
      {({ onToggle, on, ...props }) => (
        <div onClick={onToggle} {...props}>
          Favorite is {on ? "On" : "Off"}
        </div>
      )}
    </Toggler>
  )
}
```

- Data fetcher example with children prop

```js
const DataFetcher = ({ children, url, ...props }) => {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // async-await can be used instead of a promise
  useEffect(() => {
    // To set the data only if component mounted
    let mounted = true
    setLoading(true)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (mounted) {
          setData(data)
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
    // Cleanup function
    return () => {
      mounted = false
    }
  }, [url])

  // data fetching with abortController to cancel the request if component unmounts
  useEffect(() => {
    let controller = new AbortController()
    setLoading(true)
    const loadData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal })
        const data = await response.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }

    loadData()

    // Cleanup function
    return () => {
      controller.abort()
    }
  }, [url])

  return children({ data, error, loading, ...props })
}

const Todos = (props) => {
  return (
    <DataFetcher url="https://link-goes-here">
      {({ data, loading, error, ...props }) => (
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {data && data.map((todo) => <div key={todo.id}>{todo.title}</div>)}
        </div>
      )}
    </DataFetcher>
  )
}
```

## Performance

## Tips

1. Wrap each callbacks within `useCallback` so that it runs only when there are changes

2. Use `e.preventDefault()` to stop the default behaviour of `<a href="mailto:..." />` action
