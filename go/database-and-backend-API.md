## Note 
- To work without `mod.go` to manage a module, set the `GO111MODULE`, [more info](https://blog.golang.org/go116-module-changes)
```
$ go env -w GO111MODULE=auto
```

- Make sure to keep the source code under `GOPATH/src` folder, in my case I kept this code in Mac under,
`Users/punithk/go/src/github.com/kpunith8/go-jwt-auth` folder

## Create the backend with golang 

- Create a `main.go` file with, get the package `fiber` by running
```
$ go get github.com/gofiber/fiber/v2
```

- Change the port if wanted, and run the program by `go run main.go`

- To connect to DB such as `MySQL, SQLite, PostgreSQL, and SQL Server` use the package `gorm`

```go
package main

import (
    "github.com/gofiber/fiber/v2"
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
)

func main() {
    connection, err = 
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World 👋!")
    })

    app.Listen(":3000")
}
```

## Connect to MongoDB - Go 1.16

- Connecting to mongoDB and listing the databases
```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Create .env file inside the root directory and read the content using os.Getenv(key)
func getEnvVariable(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv(key)
}

func main() {
	client, err := mongo.NewClient(options.Client().ApplyURI(getEnvVariable("MONGO_URI")))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

    // Ping the database to see it is working fine
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)
}
```

### Access and Insert Documents

- Access the `db and collection`
```go
quickstartDatabase := client.Database("quickstart")
podcastsCollection := quickstartDatabase.Collection("podcasts")
episodesCollection := quickstartDatabase.Collection("episodes")
```

- Insert a single document
```go
podcastResult, err := podcastsCollection.InsertOne(ctx, bson.D{ // bson.D - Document
    {"title", "The Polyglot Developer Podcast"},
    {"author", "Nic Raboy"},
    {"tags", bson.A{"development", "programming", "coding"}}, // bson.A - Array
})
```

- Insert many documents to mongoDB 
```go
episodeResult, err := episodesCollection.InsertMany(ctx, []interface{}{
    bson.D{
        {"podcast", podcastResult.InsertedID},
        {"title", "GraphQL for API Development"},
        {"description", "Learn about GraphQL from the co-creator of GraphQL, Lee Byron."},
        {"duration", 25},
    },
    bson.D{
        {"podcast", podcastResult.InsertedID},
        {"title", "Progressive Web Application Development"},
        {"description", "Learn about PWA development with Tara Manicsic."},
        {"duration", 32},
    },
})
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Inserted %v documents into episode collection!\n", len(episodeResult.InsertedIDs))
```

### Read all the Documents

```go
cursor, err := episodesCollection.Find(ctx, bson.M{})
if err != nil {
    log.Fatal(err)
}
var episodes []bson.M
if err = cursor.All(ctx, &episodes); err != nil {
    log.Fatal(err)
}
fmt.Println(episodes)
```

- If expected result set is large, using the `*mongo.Cursor.All` function might not be the best idea. Instead, you can iterate over your cursor and have it retrieve your data in batches. 

```go
cursor, err := episodesCollection.Find(ctx, bson.M{})
if err != nil {
    log.Fatal(err)
}
defer cursor.Close(ctx)
for cursor.Next(ctx) {
    var episode bson.M
    if err = cursor.Decode(&episode); err != nil {
        log.Fatal(err)
    }
    fmt.Println(episode)
}
```

### Reading a single document 

```go
var podcast bson.M
if err = podcastsCollection.FindOne(ctx, bson.M{}).Decode(&podcast); err != nil {
    log.Fatal(err)
}
fmt.Println(podcast)
```

### Querying Documents from a Collection with a Filter

```go
filterCursor, err := episodesCollection.Find(ctx, bson.M{"duration": 25})
if err != nil {
    log.Fatal(err)
}
var episodesFiltered []bson.M
if err = filterCursor.All(ctx, &episodesFiltered); err != nil {
    log.Fatal(err)
}
fmt.Println(episodesFiltered)
```

### Sorting Documents in a Query

```go
opts := options.Find()
opts.SetSort(bson.D{{"duration", -1}})
sortCursor, err := episodesCollection.Find(ctx, bson.D{{"duration", bson.D{{"$gt", 24}}}}, opts)
if err != nil {
    log.Fatal(err)
}
var episodesSorted []bson.M
if err = sortCursor.All(ctx, &episodesSorted); err != nil {
    log.Fatal(err)
}
fmt.Println(episodesSorted)
```

### Update one document

```go
podcastsCollection := client.Database("quickstart").Collection("podcasts")
// Convert to valid object ID from a hexadecimal value
id, _ := primitive.ObjectIDFromHex("5d9e0173c1305d2a54eb431a")
result, err := podcastsCollection.UpdateOne(
    ctx,
    bson.M{"_id": id},
    bson.D{
        {"$set", bson.D{{"author", "Nic Raboy"}}},
    },
)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Updated %v Documents!\n", result.ModifiedCount)
```

### Update many documents 

```go
result, err = podcastsCollection.UpdateMany(
    ctx,
    bson.M{"title": "The Polyglot Developer Podcast"},
    bson.D{
        {"$set", bson.D{{"author", "Nicolas Raboy"}}},
    },
)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Updated %v Documents!\n", result.ModifiedCount)
```

### Replacing a docuemnt 

```go
result, err = podcastsCollection.ReplaceOne(
    ctx,
    bson.M{"author": "Nic Raboy"},
    bson.M{
        "title":  "The Nic Raboy Show",
        "author": "Nicolas Raboy",
    },
)
fmt.Printf("Replaced %v Documents!\n", result.ModifiedCount)
```

### Deleting a document

```go
database := client.Database("quickstart")
podcastsCollection := database.Collection("podcasts")
result, err := podcastsCollection.DeleteOne(ctx, bson.M{"title": "The Polyglot Developer Podcast"})
if err != nil {
    log.Fatal(err)
}
fmt.Printf("DeleteOne removed %v document(s)\n", result.DeletedCount)
```

### Deleting many documents 

```go
database := client.Database("quickstart")
episodesCollection := database.Collection("episodes")
result, err = episodesCollection.DeleteMany(ctx, bson.M{"duration": 25})
if err != nil {
    log.Fatal(err)
}
fmt.Printf("DeleteMany removed %v document(s)\n", result.DeletedCount)
```

### Drop a collection and its documents 

```go
if err = podcastsCollection.Drop(ctx); err != nil {
    log.Fatal(err)
}
```

## Errors Connectiong to MongoDB

1. server selection error: context deadline exceeded
```
server selection error: context deadline exceeded, current topology: { Type: ReplicaSetNoPrimary, Servers: [{ Addr: mongo-cluster-shard-00-02.qclzr.mongodb.net:27017, Type: Unknown, Average RTT: 0, Last error: connection() error occured during connection handshake: connection(mongo-cluster-shard-00-02.qclzr.mongodb.net:27017[-42]) socket was unexpectedly closed: EOF }, { Addr: mongo-cluster-shard-00-00.qclzr.mongodb.net:27017, Type: Unknown, Average RTT: 0, Last error: connection() error occured during connection handshake: connection(mongo-cluster-shard-00-00.qclzr.mongodb.net:27017[-41]) socket was unexpectedly closed: EOF }, { Addr: mongo-cluster-shard-00-01.qclzr.mongodb.net:27017, Type: Unknown, Average RTT: 0, Last error: connection() error occured during connection handshake: connection(mongo-cluster-shard-00-01.qclzr.mongodb.net:27017[-43]) socket was unexpectedly closed: EOF }, ] }
exit status 1
```

**Fix**

Fixed by whitelisting the IP address of the connecting computer under `Network Access`, grant from all the IP's if it is still showing errors.