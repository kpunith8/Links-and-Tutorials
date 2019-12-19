- Store data to local storage using HTML-5's localStorage API

```javascript
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serialisedState == null) {
      return undefied;
    }

    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
}

export const saveState = state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    // Can be logged
  }
}
```

- Pass the stored state to the redux-store as follows

```javascript
import { loadState, saveState } from 'localStorage';

const persistedState = loadState();
const store = createStore(<reducers>, persistedState);

// subscribe to the state change and store the data to localStorage
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});
```
