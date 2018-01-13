Links:
-----
fullstackreact.com
edgecoders.com

https://medium.com/wehkamp-techblog/unit-testing-your-react-application-with-jest-and-enzyme-81c5545cee45

https://egghead.io/lessons/react-redux-avoiding-array-mutations-with-concat-slice-and-spread

// shouldComponentUpdate(nextProps, nextState) usage
https://egghead.io/lessons/react-component-lifecycle-updating

componentWillReceiveProps(nextProps) {
    console.log('Recieves the next props' + JSON.stringify(nextProps));
    this.updateOrderDisplays(nextProps);
  }

  updateOrderDisplays(nextProps) {
    this.setState({ orderDisplays: nextProps.orderDisplays });
  }

http://lucybain.com/blog/2017/react-js-when-to-rerender/

// Sample-1: Samer Buna - Plural sight course - ES6 way
// library used: font awesome, underscore, bootstrap
// Grid system and deleting an item in the list using React
const Stars = (props) => {
	return(
  	<div className="col-5">
  	  {_.range(props.numberOfStars).map(i =>
      	<i key={i} className="fa fa-star"></i>
      )}
  	</div>
  );
}

const Button = (props) => {
	return(1
  	<div className="col-2">
    	<button>=</button>
    </div>
  );
}

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

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected';
    }
  }

	return(
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

const NewList = (props) => {
	return(
  	<div className="list">
    	<ul>{props.data}</ul>
    </div>
  );
}

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
			onClick={deleteItem.bind(this, number)}> </span></li>
    );

const newItems = this.state.newList.map((number, key) =>
    <li >{number}</li>
    );

	return(
  	<div className="list">
    	<ul>{listItems}</ul>
      <ul>{newItems}</ul>
      </div>
  );
}

// Will be used to store global variables
Numbers.list = _.range(1, 10);

class Game extends React.Component {
	constructor() {
  	super();
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

====================
// CSS for sample-1
====================
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

-------------
React Routes:
-------------
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

============
React Forms: Cory House
------------

> use mixins to refer other components,

> use statics to make transitions to one page to another, and ask save the user data before transition to another page, using
dirty state.

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

-----
Flux:
-----
> Not a framework, name for the pattern for unidirectional dataflows
> State update happens from centralized dispatcher to applications data store
> Deals with actions and data changes
> Action -> Dispatcher -> Store -> React View -> Action (unidirectional)

	> Action - Action performed - Has payload and data - makes ajax calls - uses web API
	> Dispatcher - Centralized list of callbacks - Notifies everyone who cares - only one dispatcher for an app -
		Distributes actions to the stores
	> Store - Holds the app state, logic, data retrieval - contains models - an app can have one or more stores -
		registers callbacks with dispatcher - uses Nodes EventEmitter
	> View - Holds the data in state - sends data to children as props

API:
	> register(function callback)
	> unregister(string id)
	> waitFor(array<string> ids) - update this store first
	> dispatch(object payload)
	> isDispatching()

> filter array:

function searchMovies(query) {
	return map.filter((movie) => {
		return movie.title.includes(query);
	});
}

> Validating props of an array:

		order: PropTypes.arrayOf(PropTypes.shape({
		    identifier: PropTypes.number.isRequired,
		    displayValue: PropTypes.string.isRequired,
		    required: PropTypes.bool.isRequired
		  })),

> Updating the state based on the condition in setState()

	this.setState(prevState => {(
		if(prevState.usedNumbers.length === 9) {
			return { doneStatus: 'Done!' };
		}
	)});

	-- prevState contains all the state of the components it holds,

	-- prevState passed to an function can be destructured to process

	ex: decideTheGame = ({param1, param2}) => {...};

		this.setState(prevState => {(
			if(this.decideTheGame(prevState)) {
				return { doneStatus: 'Done!' };
			}
		)});

	> Update the state 'twice', calling setState in a callback is not allowed, setState accepts callback function, once state updated

		this.setState(prevState => {(

		)}, this.updateAnotherState);

	>

	> possibleCombination by Samer Buna - https://gist.github.com/samerbuna/aa1f011a6e42d6deba46

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

------------------------------
Advanced React.js -> samerbuna
------------------------------
> To add dependencies in yarn use, $ yarn add <package-name>
> use nodemon npm package for file changes in windows
> add "nodemon lib/server.js" under scripts in package.json and run it using, $yarn dev
> Use babel to transfile, add babel to package.json as follows,
  "babel": {
    "presets": ["react", "env", "stage-2"]
  }

  install following packages to make it work,
  $ yarn add babel-cli babel-preset-react babel-preset-env babel-preset-stage-2

  Update dev script to transfile on file changes, "nodemon --exec babel-node lib/server.js"

> Use webpack to specify the bundle

> Find the time taken to process the webpack, use
  $ time yarn webpack

> 


---------------
snapshot tests:
---------------
> Add serializer in the top of the test file to make the snapshot look better

  expect.addSnapshotSerializer({
	   test: (val) => val.title && val.age,
	   print: (val) => `${val.title} ${val.age}`
   });

> Use 'enzyme-to-json/serializer as serializer' instead of seriazing manualy

	import enzymeSerializer from 'enzyme-to-json/serializer as serializer';
	for ex: expect.addSnapshotSerializer(enzymeSerializer);
