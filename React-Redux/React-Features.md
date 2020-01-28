## React basics - Lagacy
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

- `componentDidCatch(error, info)` used  to catch errors in components.

## React Hooks - 16.8

- Allows state management and life cycle management in functional components

- No need to write class, works only with functional components


### `useState` hook

```javascript
import React, { useState } from 'react';

function Counter() {
  // Initializes the count variable with 0 and setCount is a callback to update the state on click
  // It provides 2 values, de-structure them to get the values
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>{count}</button>
  );
}

export default Counter;
```

### Test a component written using hooks, using, `react-testing-library`

```javascript
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Counter from './Counter';

test('Counter increments the count', () => {
  const container = render(<Counter />);
  const button = container.firstChild;

  // Initial value
  expect(button.textContent).toBe('0');

  // Simulate the click
  fireEvent.click(button);

  expect(button.textContent).toBe('1');
});
```

### Share logic across multiple components with custom hooks

```javascript
import React, { useState } from 'react';

function useCounter(initialState, steps) {
  const [count, setCount] = useState(0);
  const increment =   () => setCount(count + steps);

  return {count, increment};
}

function Counter() {
  const { count, increment } = useCounter(5, 2);

  return (
    <button onClick={increment}>{count}</button>
  );
}

export default Counter;
```

### Store values to local storage with `useEffect` hook

- use `useEffect` hook acts like `CDM` and `CDU` life cycle methods, it runs every time state changes

```javascript
import React, { useState, useEffect } from 'react';

function Counter() {
  const initialCount = () => Number(window.localstorage.getItem('count')) || 0;  
  const [count, setCount] = useState(initialCount);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    window.localstorage.setItem('count', count);
  }, [count]); // To make sure to run this hook only when state changes

  // Passing empty array as second parameter to useEffect will load the data only the component loads for the
  // first time, like componentDidMount, specifying the state inside the array updates only when state updates
  // useEffect() can be async for eg:

  useEffect(async () => {
    const response = await window.fetch('url');
    const data = await response.json();
    const [item] = data.results; // It depends on returned value from API

    setPerson(item); // Display person object in UI
  }, []);

  return (
    <button onClick={() => setCount(count + 1)}>count</button>
  );
}

export default Counter;
```

### Modify and access DOM node with `useRef()` hook

```javascript
import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

function Tilt(props) {
    const tiltRef = useRef();
    useEffect(() => {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        'max-glare': 0.5,
      });
      // Optional return statement in useEffect() to cleanup
      return () => tiltRef.current.vanillaTilt.destroy();
    }, []);

    return(
      <div ref={tiltRef} className={tilt-root}>
        <div className={tilt-chile}>{props.children}</div>
      </div>
    );
}
```

### Use `React.lazy()` and `Suspense`

```javascript
import React, { Suspense } from 'react';

// Load the component lazily
const Tilt = React.lazy(() => import('./tilt')); // Dynamic import, imports the library when needed.

// It can be used with Suspense as follows
<Suspense fallback={<div>Loading...</div>}>
  <Tilt />
</Suspense>
```

### useReducer hook to manage more than one state in a functional component

```javascript
import { useReducer } from 'react';

// instead of using useState() hook for each state, consider, useReducer
const [state, setState] = useReducer(
	(state, newState) => ({...state, ...newState}),
	{isLoaded: false, fetching: false, data: null, error: null}
);
```
