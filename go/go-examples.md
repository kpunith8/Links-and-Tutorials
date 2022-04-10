### Util function to read environment variables using godotenv

```go
package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetEnvVariable(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv(key)
}
```

### Setup basic http server using built-in net/http package

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
  // Add folder named static in the root folder and add index.html file
  fs := http.FileServer(http.Dir("static"))

	// Route / to access index.html
	http.Handle("/", fs)

	log.Fatal(http.ListenAndServe(":3030", nil))
}
```

### Interact with GraphQL APIs

- [Interacting with graphQL API](https://www.thepolyglotdeveloper.com/2020/02/interacting-with-a-graphql-api-with-golang/)
- [Youtube playlist - Polyglot Developer](https://www.youtube.com/watch?v=1OwMtqxJDnA&list=PLII40EOBF0-voAGYkZHVipwlIVfgVxSQT)

- Using `HTTP` Package
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "time"
)

func main() {
    jsonData := map[string]string{
        "query": `
            { 
                countries {
                    code,
                    name,
                    currency
                }
            }
        `,
    }
    jsonValue, _ := json.Marshal(jsonData)
    request, err := http.NewRequest("POST", "https://countries.trevorblades.com/", bytes.NewBuffer(jsonValue))
		request.Header.Set("Content-Type", "application/json")

    client := &http.Client{Timeout: time.Second * 10}
    response, err := client.Do(request)
    defer response.Body.Close()
    if err != nil {
        fmt.Printf("The HTTP request failed with error %s\n", err)
    }
    data, _ := ioutil.ReadAll(response.Body)
    fmt.Println(string(data))
}
```

- Using `github.com/machinebox/graphql` package 

- Install the package
```shell
$ go get github.com/machinebox/graphql
```

```go
package main

import (
    "context"
    "fmt"

    "github.com/machinebox/graphql"
)

func main() {
    graphqlClient := graphql.NewClient("https:https://countries.trevorblades.com/")
    graphqlRequest := graphql.NewRequest(`
        {
						countries {
								code,
								name,
								currency
							}
        }
    `)
    var graphqlResponse interface{}
    if err := graphqlClient.Run(context.Background(), graphqlRequest, &graphqlResponse); err != nil {
        panic(err)
    }
    fmt.Println(graphqlResponse)
```

### Concurrency Patterns

- [youtube-video](https://www.youtube.com/watch?v=YEKjSzIwAdA)

