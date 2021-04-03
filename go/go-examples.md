## Util function to read environment variables using godotenv

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

## Setup basic http server using built-in net/http package

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