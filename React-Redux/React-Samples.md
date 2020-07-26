## Links:

- http://fullstackreact.com

- https://gist.github.com/samerbuna

- http://edgecoders.com  

- https://medium.freecodecamp.org/react-pattern-centralized-proptypes-f981ff672f3b

- https://medium.com/wehkamp-techblog/unit-testing-your-react-application-with-jest-and-enzyme-81c5545cee45

- https://egghead.io/lessons/react-redux-avoiding-array-mutations-with-concat-slice-and-spread

- `shouldComponentUpdate(nextProps, nextState)` usage
- https://egghead.io/lessons/react-component-lifecycle-updating

- http://lucybain.com/blog/2017/react-js-when-to-rerender/

- When component recieves props, update the state so that UI re-renders
```javascript
componentWillReceiveProps(nextProps) {
  console.log('Recieves the next props' + JSON.stringify(nextProps));
  this.updateOrderDisplays(nextProps);
}

updateOrderDisplays(nextProps) {
  this.setState({ orderDisplays: nextProps.orderDisplays });
}
```

## Samer Buna - Plural sight course

- Libraries used: `font awesome`, `underscore`, `bootstrap`

- Grid system and deleting an item in the list using React

```javascript
const Stars = (props) => {
	return(
  	<div className="col-5">
  	  {_.range(props.numberOfStars).map(i =>
      	<i key={i} className="fa fa-star"></i>
      )}
  	</div>
  );
}
```

```javascript
const Button = (props) => {
	return(1
  	<div className="col-2">
    	<button>=</button>
    </div>
  );
}
```

```Javascript
const Answer = (props) => {
	return(
  	<div className="col-5">
			{props.selectedNumbers.map((number, i) =>
        	<span className="used" key={i} onClick={() => props.unselectNumber(number)}>
          	{number}
          </span>
        )}
    </div>
  );
}
```

```javascript
const Numbers = (props) => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected';
    }
  }

	return (
  	<div className="card text-center">
    	<div>
        {Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)} id="number"
          	onClick={() => props.selectNumber(number)}>
          {number}
          </span>
        )}
      </div>
    </div>
    );
}
```

```javascript
const NewList = (props) => {
	return(
  	<div className="list">
    	<ul>{props.data}</ul>
    </div>
  );
}
```

```javascript
const List = (props) => {
	this.state = { newList: [] };

	deleteItem = (item) => {
  	props.delete(item);
  };

  addItem = (item)  => {
    	this.setState(prevState => ({
    	   newList: prevState.newList.concat(item)
    }));
  };

  const listItems = props.data.map((number, key) =>
    <li onClick={addItem.bind(this, number)}>{number}<span className="fa fa-window-close"
			onClick={deleteItem.bind(this, number)}> </span></li>);

  const newItems = this.state.newList.map((number, key) =>
    <li >{number}</li>);

	return(
  	<div className="list">
    	<ul>{listItems}</ul>
      <ul>{newItems}</ul>
      </div>
  );
}
```

- Will be used to store global variables
```javascript
Numbers.list = _.range(1, 10);
```

```javascript
class Game extends React.Component {
	constructor(props) {
  	super(props);

  	this.state = {
    	selectedNumbers: [],
      numberOfStars: 1 + Math.floor(Math.random() * 9),
      data: [1,2,3,4,5]
  	};

  	this.delete = this.delete.bind(this);
  }

  delete = (item) => {
  	this.setState(prevState => ({
    	data: prevState.data.filter(number => number !=item)
    }));
  }

  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.indexOf(clickedNumber) >=0) { return; }

    this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers
      													.filter(number => number !== clickedNumber)
    }));
  };

	render() {
  	return(
    	<div className="container">
      	<h3>Play Nine</h3>
        <hr />
        <div className="row">
        	<Stars numberOfStars={this.state.numberOfStars}/>
        	<Button />
        	<Answer selectedNumbers={this.state.selectedNumbers}
          	unselectNumber={this.unselectNumber} />
        </div>
        <br />
        <Numbers selectedNumbers={this.state.selectedNumbers}
        	selectNumber={this.selectNumber} />
        <List delete={this.delete} data={this.state.data} />
        <div className="container">
          <div className="row">
            <div className="col-6 left">
              <div className="row">
                <div className="col orders">
                  orders
                </div>
              </div>
              <div className="row">
                <div className="col search">
                  search
                </div>
              </div>
              <div className="row">
                <div className="col result">
                  result
                </div>
              </div>
            </div>
            <div className="col-6 right">
            col-6
            </div>
          </div>
        </div>
    </div>
    );
  }
}
```

```javascript
class App extends React.Component {
	render() {
  	return(
    	<div>
      	<Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

### CSS for Above code
```css
  .mountNode {
    color: #333;
  }

  .fa-star {
    margin: 0.5em;
    font-size: 24px;
  }

  .fa-window-close {
    margin: 5px;
    float: right;
  }

  li {
    background: #cce5ff;
    margin: 1px;
    padding: 10px;
  }


  #number {
    display: inline-block;
    margin: 0.5em;
    text-align: center;
    background-color: #ccc;
    width: 24px;
    border-radius: 50%;
    cursor: pointer;
  }

  .selected {
    background-color: #eee;
    color: #ddd;
    cursor: not-allowed;
  }

  .used {
    background-color: #aaddaa;
    color: #99bb99;
    cursor: not-allowed;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .left {
    height: 200px;
    background-color:#88f66d;
  }
  .right {
    height: 200px;
    background-color: #f06488;
  }

  .orders {
    height: 80px;
    background-color: gray;
  }

  .search {
    height: 20px;
    background-color: blue;
  }

  .result {
    height: 100px;
    background-color: cyan;
  }
```

### React Routes:
```javascript
"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="authors" handler={require('./components/authors/authorPage')} />
    <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')} />
    <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    <Redirect from="about-us" to="about" />
    <Redirect from="awthurs" to="authors" />
    <Redirect from="about/*" to="about" />
  </Route>
);

module.exports = routes;
```

### react-router-dom v4 sample:

```javascript
import ReactRouter from 'react-router-dom';
import Router from ReactRouter.BrowserRouter;
import Switch from ReactRouter.Switch;

App extends React.Component {
  render() {
    return(
      <Router>
        <div className="container">
          <Nav /> -- Component to show the content
          <Switch> // Switch to hande the special request coming to route other than specified one
            <Route exact path='/' component={Home} />
            <Route path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render = {function() {
                return (<p>Page Not Found</p>);
              }}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
```

```javascript
import React from 'react';
import ReactRouter from 'react-router-dom';
import NavLink from ReactRouter.NavLink;

const Nav = () => {
  return(
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/' >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle' >
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular' >
          popular
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
```

# React Forms: Cory House

- use `mixins` to refer to other components.

- use statics to make transitions to one page to another, and ask save the user data before transition to another page, using
  dirty state.

```javascript
mixins: [
	Router.Navigation
],

statics: {
	willTransitionFrom: function(transition, component) {
		if (component.state.dirty && !confirm('Leave without saving?')) {
			transition.abort();
		}
	}
},

this.transitionTo('authors'); // will take to the name of the page mentioned in Router
```

#### filter array:
```javascript
function searchMovies(query) {
	return map.filter((movie) => {
		return movie.title.includes(query);
	});
}
```

#### Validating props of an array:
```javascript
order: PropTypes.arrayOf(PropTypes.shape({
  identifier: PropTypes.number.isRequired,
  displayValue: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired
}))
```

#### Updating the state based on the condition in setState()

```javascript
this.setState(prevState => {(
	if(prevState.usedNumbers.length === 9) {
		return { doneStatus: 'Done!' };
	}
)});
```

- `prevState` contains all the state of the components it holds,

- `prevState` passed to an function can be destructured to process

```javascript
decideTheGame = ({param1, param2}) => {...};

this.setState(prevState => {(
	if(this.decideTheGame(prevState)) {
		return { doneStatus: 'Done!' };
	}
)});
```

- Update the state `twice`, calling setState in a callback is not allowed, `setState` accepts callback function

```javascript
this.setState(prevState => {(
  )}, this.updateAnotherState);
```

- possibleCombination by Samer Buna - https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
```javascript
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length;
	var combinationsCount = (1 << listSize);

  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};
```

# React and Redux: Dan Abramov

- https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions

- use `node-uuid` to generate unique id

```javascript
// Instead of return in the body cover the return in ()
export const addToDo = (text) => ({
  type: 'SET_FILTER',
  text,
});
```

- `createStore()` can take persisted state as second parameter.

```javascript
const store = createStore(todoApp, persistedState);
render(
  <Provider store = {store}>
      <Router routes = {routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
);
```

## React-Ajax call using jQuery:

```javascript
var data = {};
data.name = 'Punith';
data.id = 1;
data.age = 38;
data.sex = 'male';

jquery.ajax({
  url: 'http://localhost:3000/users',
  type: 'POST',
  data: JSON.stringify(data),
  contentType: 'application/json',
  success: function (data) {
      console.log('Update successfull');
      console.log(JSON.stringify(data));
  }.bind(this),
    error: function (xhr, status, err) {
    console.log(err);
  }
})
```

- Class can change the state of a class not the props of the class.

```javascript
class Button extends React.Component {
  state = {counter: 0};

  handleClick = () => {
    this.props.onClickFunction(this.props.incrementValue);
  };

  render() {
    return(
    	<button onClick={this.handleClick}>
      	+{this.props.incrementValue}
      </button>
    );
  }
}

const Result = (props) => {
  return(
  	<div>{props.counter}</div>
  );
};

class App extends React.Component {
  state = {counter: 0};

  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({
      counter: prevState.counter + incrementValue
    }));
  }

  render() {
  	return(
      <div>
        <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={7} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction={this.incrementCounter}/>
        <Result counter={this.state.counter}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

## Other Project

- go to -> https://api.github.com/ grab the user_url and put in browser and specify the username and get the avatar url

- css style can be used with style={{display: 'inline-block', marginLeft:10}}

- To get the data from a input field:
```javascript
// one way of getting the data from the input and can be accessed using `this.userInput.value`
ref = {(input) => this.userInput = input}
```

- Working with data - Add Github users using github api
```javascript
const Card = (props) => {
  return(
  	<div style={{margin: '1em'}}>
    	 <img width="75" src={props.avatar_url} />
        <div style={{display: 'inline-block', marginLeft: 10}}>
        	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
          <div>{props.company}</div>
        </div>
      </div>
  );
};
```

```javascript
class Form extends React.Component {
	state = { userName: ''};

	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(resp => {
    	this.props.onSubmit(resp.data);
      this.setState({userName: ''});
    });
  };

	render() {
  	return(
      <form onSubmit={this.handleSubmit}>
      	<input type="text"
      	value={this.state.userName}
        onChange={(event) => this.setState({ userName: event.target.value })}
        placeholder="Github username" required/>

      	<button type="submit">Add User</button>
      </form>
    );
  }
}
```

```javascript
class App extends React.Component {
  state = {
  	cards: []
  };

  addNewCard = (cardInfo) => {
  	this.setState((prevState) => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
  	return(
    	<div>
    		<Form onSubmit={this.addNewCard}/>
      	<CardList cards={this.state.cards} />
      </div>
    );
  }
}
```

```javascript
const CardList = (props) => {
	return(
  	<div>
    	{props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
};

ReactDOM.render(<App />, mountNode);
```

### Reusable components

#### Eject create-react-app

- `ModuleScopePlugin()` comment this in plugins in `webpack.config.js` and `contentBase: paths.appPublic`,
to import content from outside `/src` folder

- `Webpack alias` - to remove the path identifiers when importing the components ex: `import Example from `../../components/Example`
  to `module/Example`, set the alias in
```javascript
alias:
  { 'name': path.resolve(__dirnname, '../src/components')
}
```

#### Component Design

- `Avoid week elements` - within `<p>` you cannot put `<h1>` inside, instead consider, put `{children}` within  `<div>`
```html
<p>
  <h1>..</h1>
<p>
<!-- instead use -->
<div>
  {children}
</div>
```

- Use `Proptypes` and `defaultProps`- generates runtime warnings to check the types of component.
```javascript
Component.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number
  }),
  onSelect: PropTypes.function,
};
// Default props for the component
Component.defaultProps = {
  message: "World!",
  onSelect: () => {},
};
```

- `Don't hard code HTML IDs` - may conflict with other markup, pass them as props to the component

- `Consider accessibility` - use `tabIndex` attribute to navigate using tab, use `semantic HTML`;
instead of using `<span>` and `<div>` for actual button element `<button>`.
Add `label` attribute to input field for screen readers,  use keyboard navigation.

- `Consider config objects for props` - API can evolve easily without adding new props as and when new fields needs to be added.
```javascript
<UserDetail name="Punith" title="Developer" />
// instead use
<UserDetail user={{name: "Punith", title: "Developer"}} />
```

- Pass props via spread operator <UserDetail {...this.props} />

- Use spread with de-structuring
```javascript
const UserDetail = ({name, ...props}) => {
  return <div {...props}>{name}</div>
}
```


## redux-saga

```javascript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

function* helloSaga() {
  console.log('Hello Sagas!')
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(helloSaga);

const action = type => store.dispatch({type});
```

- Asynchronous call
```javascript
import { put, takeEvery, call } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000); // use call to test it easily, // yield call(delay, 1000)
  yield put({ type: 'INCREMENT' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync); // action to be dispatched
}
```

```javascript
import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.url)
      yield put({type: "FETCH_SUCCEEDED", data})
   } catch (error) {
      yield put({type: "FETCH_FAILED", error})
   }
}

// To launch the above task on each FETCH_REQUESTED action:

import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
```

- `takeEvery` allows `multiple` fetchData instances to be started `concurrently`.

- `takeLatest` allows `only one` fetchData task to run at any moment, if a previous task
  is still running when another fetchData task is started, the previous task will be automatically `cancelled`.

- If you have multiple Sagas watching for different actions, you can create `multiple watchers` with those built-in helpers.
  ```javascript
  // FETCH_USERS
  function* fetchUsers(action) { ... }

  // CREATE_USER
  function* createUser(action) { ... }

  // use them in parallel
  export default function* rootSaga() {
    yield takeEvery('FETCH_USERS', fetchUsers);
    yield takeEvery('CREATE_USER', createUser);
  }
  ```

- `fork` effect that allows us to start multiple sagas in the `background`.

- `put` dispatches the action to the store.

- `take`, which makes it possible to build complex control flow by allowing total control of the action observation process.
  eg: `A basic logger` using `takeEvery` - Saga that `watches all actions` dispatched to the store and logs them to the console.

- `take` will `suspend` the generator until a matching action is dispatched.

- Using `takeEvery('*')` (with the wildcard * pattern), we can catch all dispatched actions regardless of their types.
  ```javascript
  import { select, takeEvery } from 'redux-saga/effects';

  function* watchAndLog() {
    yield takeEvery('*', function* logger(action) {
      const state = yield select();

      console.log('action', action);
      console.log('state after', state);
    })
  }
  ```

- Using `take` effect
  ```javascript
  import { select, take } from 'redux-saga/effects';

  function* watchAndLog() {
    while (true) {
      const action = yield take('*');
      const state = yield select();

      console.log('action', action);
      console.log('state after', state);
    }
  }
  ```

### Find the scroll position to fix the header
- https://www.w3schools.com/howto/howto_js_sticky_header.asp

```javascript
import {useEffect} from 'react';
import {useWindowScroll} from 'react-use';

let {y} = useWindowScroll();
useEffect(() => {
  let pageHeader = global.document.querySelector(".page-header");
  let pageHeaderOffsetTop = pageHeader.offsetTop;
  let pageYOffset = global.window.pageYOffset;

  if(pageYOffset > pageHeaderOffsetTop)
  {
    pageHeader.classList.add("sticky");
  }

  return () => pageHeader.classList.remove("sticky");
}, [y]);
```

## Code sandbox - network error accessing fetch

- Prepend the link with the following, allows only 50 requests/30mins
```
fetch(`https://cors-anywhere.herokuapp.com/<url>`).then(...)
```

## Add css styles with hooks (passed as array)

```javascript
const [cardStyle, setCardStyle] = useState({})

useEffect(() => {
  const borderColor = isSuccess(dep1)
    ? isConnected
      ? colors.primary
      : colors.red300
    : isError(dep2)
    ? colors.red300
    : colors.gray100

  setCardStyle({borderTop: `3px solid ${borderColor}`})
}, [dep1, dep2])

// Passing array of styles to css
<Details css={[{maxWidth: '30%'}, cardStyle]} />
```

## Using mdx-deck for creating presentations

- [mdx-deck](https://github.com/jxnblk/mdx-deck)

- Initialise the project with `deck`
  ```
  $ npm init deck my-deck
  ```

- Install the dependencies to highlight, scroll, zoom the code snippet, `mdx-deck-code-surfer`
  and `raw-loader` for webpack to lazily require the code snippets
  ```
  $ npm install mdx-deck-code-surfer raw-loader -D
  ```

- Once installed start the dev server
  ```
  $ npm start
  ```
- Create the folder to store the `snippets`,

- Modify the `deck.mdx` file
  ```js
  import {Head} from 'mdx-deck'

  export {default as theme} from './theme'

  import {CodeSurfer} from 'mdx-deck-code-surfer'

  <CodeSurfer
    //code="console.log('Hello World!')" // Sample code to display
    code={require('raw-loader!./snippets/1.snippet')}
    title="Snippet"
    notes="Initial Notes" // on the footer
    showNumbers // display line of the code snippet
    steps={[
      {lines: [5], notes: "Lines"}, // only line 5 is shown
      {lines: [4, 5, 6], notes: "Lines"}, // multiple lines
      {range: [4,6], notes: "Range"}, // same as multiple lines
      {ranges: [[1,2], [4,6]], notes: "Ranges"}, // multiple blocks of code is shown
      {tokens: {1: [2,6]}, notes: "Tokens"} // show the 2nd and 6th word in the first line
    ]}
  />
  ```

## Inject babel, webpack config of a create-react-app using `react-app-rewired`

- Use `react-app-reqired` instead of `react-scripts` in script section
  ```json
  "scripts": {
    "start": "react-app-rewired start"
  }
  ```

- Create `config-overrides.js` in root folder to modify babel config,
  below example shows it for, `mdx`
  ```js
  const {getBabelLoader} = require('react-app-rewired')

  module.exports = (config, env) => {
    const babelLoader = getBabelLoader(config.module.rules)

    config.module.rules.map(rule => {
      if(typeof rule.test !== 'undefined' || typeof rule.oneOf === 'undefined') {
        return rule
      }

      rule.oneOf.unshift({
        test: /\.mdx?$/,
        use: [
          {
            loader: babelLoader.loader,
            options: babelLoader.options
          },
          '@mdx-js/loader'
        ]
      })

      return rule
    })
    return config
  }
  ```

### Import svg as a react-component in CRA-2.0

- Instead of specifying the svg as src to `<img>` tag, use `ReactComponent` wrapped component
  for an svg
  ```js
  import {ReactComponent as ReactLogo} './logo.svg';

  export default props => (
    <ReactLogo className="main-logo" />
  )
  ```

- Using the classname it can be styled or animated,
  ```css
  .main-logo path {
    stroke: placegoldenrod;
    stroke-width: 10px;
    fill: none;
    stroke-dasharray: 35px 15px;
    animation: orbit 1s infinite linear;
  }

  @@keyframes orbit {
    to {
      stroke-dashoffset: 50px;
    }
  }
  ```

### Install and initialise eslint

- Install the plugins
  ```
  $ npm i -D eslint{,-plugin-react, -plugin-react-hooks}
  ```

- Create a config file for `eslint`
  ```
  $ npx eslint --init # Select the appropriate options and it creates the .eslintrc.js file
  ```
