## MongoDB: NoSQL database - document database

### Links and references:
- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

### Shortcuts: mongo shell
- `Ctrl+K` - to delete the chars to its right

- `Ctrl+L` - clears the screen

- `Ctrl+Left arrow/Right arrow` - to jump a word in the command line

### RDBMS issues
- `Scalability` - Replication or sharding takes more time, higher latency, tables are locked down, and one writes hence higher latency

### Advantages of MongoDB
- No schema in MongoDB, single document write scope, each document is in a collection

### Mongo DB setup in Windows
- Download and install monogoDB

- MongoDB requires a data directory to store all data. MongoDB’s default data directory path is the absolute path `\data\db` in the drive from which you start MongoDB.

- If no `data/db` exists create one in the installation path and run monogod demon - it starts the server

- If you want to install the MongoDB at a different location, then you need to specify,
an alternate path for \data\db by setting the path dbpath in mongod.exe. For the same, issue the following commands.

- Create `mongod.conf` file with the following properties,
	```
	dbpath=\mongodb\db
	logpath=\mongodb\mongo-sever.log
	verbose=vvvvv -> one v being least verbose, 5 v's being most verbose
	```
	
- run it as,
	```
	$ mongod -f c:\sample\mongod.conf
	
	// Or path can be set in command line as follws,
	$ mongod.exe --dbpath "d:\set-up\mongodb\data"
	```
		
- To start MongoDB, run `mongod.exe`,
	```
	$ C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe
	```

- To connect to MongoDB through the `mongo.exe` shell, open another Command Prompt.
	```
	$ C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe
	```

### Configure as a Windows Service
-	Open the command prompt in `Administrator` mode;
Press the `Win key`, type `cmd.exe`, and press `Ctrl+Shift+Enter` to run the Command Prompt as Administrator.

- Execute the remaining steps from the Administrator command prompt.
	- Create directories
	- Create directories for your database and log files:
	```
	mkdir c:\data\db
	mkdir c:\data\log
	```
	
- Create a configuration file.
	- The file must set `systemLog.path`. Include additional configuration options as appropriate.
		For example, create a file at `C:\Program Files\MongoDB\Server\3.4\mongod.cfg` that specifies both `systemLog.path` and `storage.dbPath`
		```
		systemLog:
			destination: file
			path: c:\data\log\mongod.log
		storage:
			dbPath: c:\data\db
		```
	
> Important: Run all of the following commands in Command Prompt with “Administrative Privileges”

- Install the MongoDB service.
	
	- Install the MongoDB service by starting `mongod.exe` with the `--install` option and
		the `--config` option to specify the previously created configuration file.
		```
		$ "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --config(-f) "C:\Program Files\MongoDB\Server\3.4\mongod.cfg"  --install
		```
	- If needed, you can install services for multiple instances of `mongod.exe` or `mongos.exe`
	- Install each service with a unique --serviceName and --serviceDisplayName. Use multiple instances only when sufficient system resources exist and your system design requires it.

- Start the MongoDB service.
	```
	$ net start MongoDB
	```

- Stop or remove the MongoDB service as needed.
	```
	$ net stop MongoDB
	```

- To remove the MongoDB service use the following command:
	```
	$ C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe --remove
	```

- list the service Running:
	```
	$ net start | findstr mongo
	```

### Working with mongodb from command prompt
- Create and use database
	```javascript
	// shows the db currently in use 
	$db 

	// shows the list of databases
	$show dbs

	// to select the database
	$use <db_name>

	// shows the list of collections
	$show collections

	// choose your collection and see all contents of that collection:
	$db.collectionName.find().pretty()
	```

-	To create both the database `myNewDatabase` and the collection `myCollection` with the `insertOne()` operation
	```javascript
	$use myNewDatabase
	$db.myCollection.insertOne( { x: 1 } );

	// Remove a record 
	$db.collectionName.remove("objectID");

	// drop a collection
	$db.collectionName.drop()
	```

### Create Replica set of the DB
- `Primary DB` - one and only writable database

- `Secondary DB` - read only instances, if Primary fails, secondary becomes Primary

- `Arbiter DB` - It provides an additional vote if secondary wants to become primary, secondary needs majority of > 50 % votes

- Create a batch file, in the root directory:
	```
	cd \sample\

	mkdir \sample\db1
	mkdir \sample\db2
	mkdir \sample\db3

	@REM Primary
	start "a" mongod --dbpath ./db1 --port 30000 --replSet "demo"

	@REM Secondary
	start "a" mongod --dbpath ./db2 --port 40000 --replSet "demo"

	@REM Arbiter
	start "a" mongod --dbpath ./db3 --port 50000 --replSet "demo"
	```
	
- or run the each instance separately, 
	```javascript
	$ start "a" mongod --dbpath ./db3 --port 50000 --replSet "demo"
	```

- `$ mongo --port 30000`

- `$ db.getMongo()` - returns the port number db connected to

- create `demoConfig` as, mongo shell interprets as javascript interpreter
	```javascript
  $ var demoConfig = { _id: "demo",
										 	members: [
												{
													"_id": 0,
													"host": "localhost: 30000",
													"priority": 10
												},
												{
													"_id": 1,
													"host": "localhost: 40000",
												},
												{
													"_id": 2,
													"host": "localhost: 50000",
													arbiterOnly: true
												}
											]
										};
	```
	
- Initialise the replica set
	```javascript
	$ rs.initiate(demoConfig)
	```
	
### Mongo Shell
```javascript
// To rotate the same log file, `printjson()` method used to print it as json to output
$ mongo localhost/admin --eval "db.runCommand({logRotate: 1})" 
```

- We can also pass `JavaScript` scripts as input to the shell,

- Write a script to calculate the count of users, create `userCount.js` as follows,
	```javascript
	var userCount = funtion() {
		var count = db.Users.count();
		var entry = {_id: Date(), n: count};
		db.UserCountHistory.save(entry);
		print("\nToday's user count: " + entry.n);
	};

	userCount();
		
  // Run this script as,
	$ mongo userCount.js
	```
		
- Add `dropDatabase` prototype a script so that dropping the db will show a message, save it as, `safer.js`
	```javascript
	DB.prototype.dropDatabase = function() {
		print("Don't delete it");
	}

	db.dropDatabase = DB.prototype.dropDatabase;
	
	// run it as,	
	$ mongo safer.js --shell // --shell option helps stay in the shell
	```
	
- set `EDITOR` to edit the content in the command line, 
	```javascript
	$ set EDITOR="C:\Program Files\editor.exe"
	
	// then run
	$ edit myProgram
	```

- To run the script whenever shell loads, put the script to `.mongorc.js` file which will reside in 
`users/<user-name>/.mongorc.js`, which will be useful in production. 
Add `safer.js` file content to `mongorc.js` file and it won't allow dropping database in production.

- To not to load the `mongorc.js` file to enforce restrictions, run the following command as follows
	```javascript
	// it will be useful during development to not to run mongorc.js file every time shell loads
	$ mongo --norc 
	```
		
- In production we can disable the `dropDatabase` and `shutdownServer`, add the following lines to `mongorc.js` file to enforce it,
	```javascript
	var _no_ = function() { 
		print('Not Allowed!');
	}
	DB.prototype.dropDatabase = _no_;
	db.dropDatabase = db.prototype.dropDatabase;

	DB.prototype.shutdownServer = _no_;
	db.shutdownServer = db.prototype.shutdownServer;
	```

### Storing Data

- MongoDB uses memory mapped file

- Stored as `BSON`; Binary JSON - Data storage serialization format;
Overhead of marshalling data to disk and usage of data in the server is efficient
 
- Rules to store data:
	- A document must have an `_id` field, size of document is `16MB`.

- `$ show collections` - to list all the collections within a database.

- `_id` can be of any type, and can be complex object as well, `array` cannot be used as a datatype to `_id`.

- If no `_id` specified while inserting data to collection, mongodb inserts `ObjectId()`; which is unique and has the following properties,
`ObjectId().getTimestamp()`; returns ISODate()

- It allows to use the same `_id` for `inserting multiple documents` but it over writes the data of the `_id` which is 
already exists with the new data, it updates the fields as well, it happens if `save()` function is used, 
if `insert()` function used, it errors out the `duplicate key error`.

### update command: It is atomic with in a document - no two users can update:
```javascript
$ db.foo.update(query, update, options);

// $inc - increments the value by 1
$ db.test.update({ _id:1 }, { $inc: { x:1 } });
 
// $set - sets new field to the test collection 
$ db.test.update({ _id: 1 }, { $set: { y:10 } });

// unsets the field in the collection passed to $unset
$ db.test.update({ _id: 1 }, { $unset: { y: '' or 0 });

// Updates the field name
$rename: { 'Naem': 'Name'}

// pushes new array to the collection
$push: { things: "one" }

// Adds the unique items to array
$addToSet: { things: "one" }

// removes all instance of an item in an array, `three` items in a things will be pulled out of an array
$pull: { things: 'three'} 

// removes the last element in the array, -1 removes the first element in the array
$pop: {things: 1} 
```

- Multi-Update
	```javascript
	// Updates things with 4 in all the documents
	$ db.foo.update({}, { $push: { things: 4 }, { multi: true }); 

	// Updates only the array has 2 in it
	$ db.foo.update({things: 2}, { $push: { things: 42 }, { multi: true });
	```

### Finding Documents
```javascript 
$ db.foo.find(query, projection);

// returns only id field matching the query, projection can be set to 0 to not to show the field names, and multiple
// fields can be seperated by comma, here name field is not shown in the output
$ db.foo.find({_id: 1}, {_id: 1, name: 0});

// Returns the ids greater than 5, $lt - less than, {$gt:2, $lt: 6} - range - comma between the criteria acts as AND
$ db.foo.find({_id: {$gt: 5}});

// Negating
$ db.foo.find({_id: {$not: {$gt: 5}}}); 

// $nin for not in
$ db.foo.find({_id: {$in: [1,3] } });

// case sensitive search
$ db.foo.find({tags: 'cute'}, {name: 1});

// $all: ['cute', 'ocean'] to get both cute and ocean tags, can use dot notation to access nested fields
// {"info:canFly": true, "info:type": 'bird'}
$ db.foo.find({tags: {$in: ['cute', 'ocean']}}); 
		
// checking for null on dot notation, will return one with null and one without that property exists in the document.
// checks for the property canFly exists in the document
$ db.foo.find({"info:canFly": { $exists: true }});

// returns cursor object, which can be iterated using forEach and can run hasNext() and size() operations on it
$ find();

// 1 - Ascending and -1 - Descending order
$ db.foo.find({}).sort({name: 1});

// can be used to limit the number of documents to be displayed or fetched
$ limit(3) 

// fetches only one record - it has no cursor
$ findOne({})
```

### Indexing
- Regular indexing (B-Tree), Geo indexing, text indexing, hashed indexed (sharding), TTL - time to leave indexing
	```javascript
	$ db.foo.ensureIndex(keys, options);
	
	// explain() function on cursor will tell whether it has index or not, cursor property tells whether it is indexed or basicCursor
	
	// 1 means Ascending order alphabetically and -1 for Descending order
	$ db.animals.ensureIndex({name: 1}); 
	
	// ns - name space
	$ db.system.indexes.find({ns: 'test.animals'}, {key: 1});
	```