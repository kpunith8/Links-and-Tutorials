
## Basic connection example using

- Install this plugins using `npm` or `yarn`.

```javascript
var express = require('express');
var path = require('path');
var open = require('open');
var cors = require('cors');

const port = 3000;
var app = express();

// For cross origin connection issues with the browser
// use cors middleware
app.use(cors());

// use middleware to serve static files from express
app.use(express.static('public')); // could be or any folder

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../src/index.html')); // Looks for index.html file src directory
});

// Regular expression can be used to match the URLs
// get can also be used
app.all("/user[s]?/:userId", (req, res) => {
	res.end("You asked for: " + req.params.userId);
});

app.listen(port, (err) => {
	if(err) console.error(err);

	open('http://localhost:' + port);
});
```

### RESTfull services with Node.js, express, mongoose:

- HATEOAS - Hypermedia as the Engine of Application State

### mongoose

- Database connection

```javascript
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});
```

- Create a simple schema

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var kittySchema = new mongoose.Schema({
	name: String
});

// export it if you want to store it in separate file as, kittenModel.js
// module.exports = mongoose.model('Kitten', kittySchema); // Can be accessed as Kitten
var Kitten = mongoose.model('Kitten', kittySchema);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
```

### Querying and saving the data to DB

#### Save the kitten to DB using `save()`
```javascript
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.save((err, fluffy) => {
	if(err) return console.error(err);
	fluffy.speak();
})
```

#### Find and query for specific data

- Display all kittens

```javascript
Kitten.find((err, kittens) => {
  if (err) return console.error(err);
  console.log(kittens);
})
```

- Find a specific Kitten

```javascript
Kitten.find({ name: /^fluff/ }, callback);
```

## Schemas

- Each schema `maps` to a `MongoDB collection` and defines the `shape of the documents` within that collection.

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
	// Array of comments, with body and date init
  comments: [{ body: String, date: Date }],
	// Date object with type and default
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```

### Add additional schema to existing schema

```javascript
const ToySchema = new Schema();
ToySchema.add({ name: 'string', color: 'string', price: 'number' });
const TurboManSchema = new Schema();
// You can also `add()` another schema and copy over all paths, virtuals,
// getters, setters, indexes, methods, and statics.
TurboManSchema.add(ToySchema).add({ year: Number });
```

- The permitted `SchemaTypes` are:
`String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array`, `Decimal128`, and `Map`

### Create model

```javascript
var blog = mongoose.model('Blog', blogSchema);
```

### Instance methods

- Instances of Models are `documents`. Documents have many of their own built-in instance methods. We can also define custom document instance methods.

- Overwriting a default mongoose document method may lead to unpredictable results.

- Do not declare methods using ES6 `arrow functions` (=>). Arrow functions explicitly `prevent binding` `this`, so your method will not have access to the document.

```javascript
// define a schema
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
	return this.model('Animal').find({ type: this.type }, cb);
};

// Now all of our animal instances have a findSimilarTypes method available to them.
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs);
});

// Methods can also be defined using, schema.prototype.method()
// For more than one function
animalSchema.method({
	purr: function () {},
 	scratch: function () {}
});

animalSchema.method('makeNoise', function () {
  console.log('Grrrrrh');
})
```


### Statics

- Do not declare statics using ES6 `arrow functions` (=>). Arrow functions explicitly prevent binding this.

```javascript
// Assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};
// Or, equivalently, you can call `animalSchema.static()`.
animalSchema.static('findByBreed', function(breed) {
  return this.find({ breed });
});

const Animal = mongoose.model('Animal', animalSchema);
let animals = await Animal.findByName('fido');
animls = animals.concat(await Animal.findByBreed('Poodle'));
```


## Queries
- Mongoose models provide several static helper functions for CRUD operations.
Each of these functions `returns` a mongoose `Query object`.
	- Model.deleteMany()
	- Model.deleteOne()
	- Model.find()
	- Model.findById()
	- Model.findByIdAndDelete()
	- Model.findByIdAndRemove()
	- Model.findByIdAndUpdate()
	- Model.findOne()
	- Model.findOneAndDelete()
	- Model.findOneAndRemove()
	- Model.findOneAndUpdate()
	- Model.replaceOne()
	- Model.updateMany()
	- Model.updateOne()


-  mongoose query can be executed in one of two ways. First, if you pass in a `callback` function.
Mongoose will execute the query `asynchronously` and pass the results to the `callback`.

- A query also has a `.then()` function, and thus can be used as a `promise`.

### Executing

- When executing a query with a callback function, you specify your `query as a JSON document`.
The JSON document's syntax is the same as the `MongoDB shell`.

```javascript
var Person = mongoose.model('Person', yourSchema);

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
	if (err) console.console.error();(err);

	console.log(person.name.first, person.name.last, person.occupation);
});
```

- Now let's look at what happens when no callback is passed:

```javascript
// find each person with a last name matching 'Ghost'
var query = Person.findOne({ 'name.last': 'Ghost' });

// selecting the `name` and `occupation` fields
query.select('name occupation');

// execute the query at a later time
query.exec(function (err, person) {
  if (err) return console.err(err);
  console.log(person.name.first, person.name.last, person.occupation);
});
```

- `Query` object enables to build up a query using chaining syntax, rather than specifying a JSON object.
These 2 examples are equivalent.

```javascript
// With a JSON doc
Person
  .find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  })
  .limit(10)
  .sort({ occupation: -1 })
  .select({ name: 1, occupation: 1 })
  .exec(callback);

// Using query builder
Person.
  find({ occupation: /host/ })
  .where('name.last').equals('Ghost')
  .where('age').gt(17).lt(66)
  .where('likes').in(['vaporizing', 'talking'])
  .limit(10)
  .sort('-occupation')
  .select('name occupation')
  .exec(callback);
```

###  Queries are Not Promises

- Mongoose queries are not `promises`. They have a `.then()` function for `co` and `async/await` as a convenience.
However, unlike promises, calling a query's `.then()` `can execute the query multiple times`.

- For example, the below code will execute 3 updateMany() calls, one because of the `callback`, and two because `.then()` is called twice.

```javascript
const q = MyModel.updateMany({}, { isDeleted: true }, function() {
  console.log('Update 1');
});

q.then(() => console.log('Update 2'));
q.then(() => console.log('Update 3'));
```

- Don't mix using `callbacks` and `promises` with queries, or you may end up with `duplicate operations`.

### References to other documents

#### Populate

- MongoDB has the join-like `$lookup` `aggregation operator` in versions >= 3.2.
Mongoose has a more powerful alternative called `populate()`, which lets you reference documents in other collections.

- Population is the process of automatically `replacing` the specified paths in the `document with document(s)` from other collection(s).
We may populate a single document, multiple documents, plain object, multiple plain objects, or all objects returned from a query.

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
```

-  The `ref` option is what tells Mongoose which model to use during population.
All `_ids` we store here must be `document _ids` from the `Story` model.

> Note: `ObjectId`, `Number`, `String`, and `Buffer` are valid for use as `refs`.
However, you should use `ObjectId` unless you are an advanced user and have a good reason for doing so.

#### Saving refs

- Saving refs to other documents works the same way you normally save properties, just assign the `_id` value

```javascript
const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
  });
});
```
