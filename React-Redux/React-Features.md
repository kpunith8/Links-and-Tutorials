## React Hooks - 1.17.0-alpha.0
- Allows state management and life cycle management in functional components
- No need to write class
- use `react: "next"` to get the latest alpha to use this feature

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

  useEffect(() => {
    window.localstorage.setItem('count', count);
  }, [count]); // To make sure to run this hook only when state changes

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
