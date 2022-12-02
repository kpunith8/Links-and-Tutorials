# Go Lang

## Paths

- Set the `GOPATH` to your project directory, if the project
  created is not under the `GOPATH`, for eg: if your project is in `Documents`
  set the path as follows (`Mac`) (For windows consult the docs)
  ```
  $ export GOPATH="/Users/<user-name>/Documents/go-samples/"
  ```

- Check the path of environment variables using,
  ```
  $ go env GOPATH
  ```

- Unset the previously set env variable
  ```
  $ go env -u GOPATH/GOBIN
  ```

- Set the default value of a `GOPATH` or `GOBIN`
  ```
  $ go env -w GOBIN=/somewhere/else/bin
  ```

## Packages - Importing Local Packages

- Create the folder structure as the name of the package, under `GOPATH`
  ```
  $ cd src/github.com/kpunith8/gosamples
  ```

- Create `mod.go` file in the root folder
  ```
  $ go mod init github.com/kpunith8/gosamples
  ```
  - Stick with lower case letters for package names, `no underscores`, `hyphens` or `camel cases`,
    here `gosamples` is the folder/package name where all the code exists.

- Create a file `sample.go` inside the `gosamples` folder.

- `install` the project
  ```
  $ go install github.com/kpunith8/gosamples

  // or use shorthands if you are in the root directory
  $  go install .
  $  go install
  ```
  - This command builds the `gosamples` command, producing an executable binary.

  - It then installs that binary as `$HOME/go/bin/gosamples` (Relative Path)

  - The install directory is controlled by the `GOPATH` and `GOBIN`

  - If `GOPATH` is set, binaries are installed to the `/bin sub directory` of the first directory in the GOPATH list.
    Otherwise, binaries are installed to the `bin sub directory` of the default `GOPATH`

### Creating a module for a project

```
$ go mod init github.com/kpunith8/package-name
```

And run `mod tidy` to install the missing dependencies

```
$ go mod tidy
```

### Importing packages from your module

- Create a `ds` package and use it from the `sample.go` program

- Create a directory `ds` under `gosamples` and add a file named `ds.go` and add some code,
  to export some code it should start with a `uppercase letter` for eg, function name should
  start with a uppercase letter, `GetName`

- File name can be different but it should have the package name as its parent folder, here,
  `ds` is the package name and file name can be `func-utils.go`

- It should not contain main function
  ```go
  package ds

  // Adder function closure example
  func Adder() func(int) int {
    sum := 0
    return func(x int) int {
      sum += x
      return sum
    }
  }
  ```

- Build the created package to check whether it compiles
  ```
  $ cd ds
  // Build is not required
  $ go build
  ```
  - This won't produce an output file. Instead it saves the compiled package in the local build cache.

- Use it in `sample.go`, import and use it,
  ```go
  package main

  import (
    "fmt"
    "github.com/kpunith8/gosamples/ds"
  )

  func main() {
    adder1 := ds.Adder()
    fmt.Println("Adder:", adder1(10))
  }
  ```

- Install the `gosamples` program
  ```
  $ go install .
  ```

- Run the program
  ```
  $ gosamples

  // or run the program
  $ go run samples.go
  ```

- OR run the

## Functions

- Functions allows to organize logic into `repeatable procedures` that can `use different arguments each time` they run.

- It should have `main()` function to execute the code

- Function with 2 params and type declaration after the variable declaration
  ```go
  func add(x int, y int) int {
    return x + y
  }
  ```

- When two or more consecutive named function parameters `share a type`, `omit the type from all but the last`.
  ```go
  func add(x, y int) int {}
  ```

- A function can return any number of results
  ```go
  func swap(x, y string) (string, string) {
    return y, x
  }
  ```

- Return values may be `named`. If so, they are treated as `variables` defined at the top of the function.
  These names should be used to document the meaning of the return values.

- A return statement `without arguments` returns the named return values. This is known as a `naked return`.

- Naked return statements should be `used only in short functions`. They can harm readability in longer functions.
  ```go
  func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
  }
  ```

## Variables

- A `name` is exported if it begins with a `capital letter`.

- The `var` statement declares a list of variables; as in function argument lists, the `type` is last.

- A var statement can be at package or function level.
  ```go
  var c, python, java bool
  ```

### Variable Initializers

- A var declaration can include initializers, one per variable.
  ```go
  var val1, val2 int = 12, 22
  ```

- If an initializer is present, the `type can be omitted`; the variable will take the type of the initializer.
  ```go
  var c1, python1, java1 = true, false, "no!"
  ```

- Variable declarations may be `factored` into blocks, as with import statements.
  ```go
  var (
    ToBe   bool       = false
    MaxInt uint64     = 1<<64 - 1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
  )
  ```

### Short Variable Declarations

- Inside a function, the `:=` short assignment statement can be used in place of a var declaration `with implicit type`.

- Outside a function, every statement begins with a keyword (var, func, and so on) and so the `:=` construct is not available.


## Basic Types

- Basic types
  ```go
  bool
  string

  int  int8  int16  int32  int64
  uint uint8 uint16 uint32 uint64 uintptr

  byte // alias for uint8
  rune // alias for int32, represents a Unicode code point

  float32 float64

  complex64 complex128
  ```

- Variables declared `without an explicit initial value` are given their `zero value`.
  `0` for numeric types, `false` for boolean types, and `""` for string types

## Type Conversions

- The expression T(v) converts the value v to the type T.
  ```go
  integerVal := 42
  floatVal := float64(integerVal)
  uIntVal := uint(floatVal)
  ```

## Type Inference

- When declaring a variable without specifying an explicit type (either by using the := syntax or var = expression syntax),
  the variable's type is inferred from the value on the right hand side.

## Constants

- Constants are declared like variables, but with the `const` keyword.

- Constants can be character, string, boolean, or numeric values.

- Constants `cannot be declared` using the `:=` syntax.
  ```go
  const Pi = 3.14
  const Truth = true
  ```

## Defer

- A `defer` statement defers the execution of a function until the surrounding function returns.

- The deferred call's arguments are evaluated immediately, but the function call is not
  executed until the surrounding function returns.
  ```go
  defer fmt.Println("Defer")
  ```

## For

- For loop can have `init`, `post` and `condition` statements
  ```go
  sum := 0
  for i := 0; i < 10; i++ {
    sum += i
  }
  ```

- The init and post statements are optional. It can also be used as `while`
  ```go
  sum1 := 1
  for sum1 < 1000 {
    sum1 += sum1
  }
  ```

- Omit the `loop condition` it loops forever, so an `infinite` loop is compactly expressed, like `while`
  ```go
  for { // infinite loop
  }
  ```

## If with a Short Statement

- Like `for`, the `if` statement can start with a short statement to execute before the condition.

- Variables declared by the if statement are only `in scope until the end of the if`
  ```go
  func powerOfX(x, n, limit float64) float64 {
    if v := math.Pow(x, n); v < limit {
      return v
    }
    return limit
  }
  ```

## If and Else

- Variables declared inside an if short statement are also available inside any of the else blocks.
  ```go
  func pow1(x, n, limit float64) float64 {
    if v := math.Pow(x, n); v < limit {
      return v
      } else {
        fmt.Printf("%g >= %g\n", v, limit)
      }
      // can't use `v` here
      return limit
  }
  ```

## Switch Block

- Switch block
  ```go
  import "runtime"

  switch os := runtime.GOOS; os {
    case "darwin":
      fmt.Println("OS X.")
    case "linux":
      fmt.Println("Linux.")
    default:
      // freebsd, openbsd,
      // plan9, windows...
      fmt.Printf("%s.\n", os)
	   }
  ```

- Switch without a condition is the same as switch true.

## Pointers

- A pointer holds the memory address of a value.

- The type `*T` is a pointer to a T value. Its zero value is `nil`.

- The `&` operator generates a pointer to its operand.

- The `*` operator denotes the pointer's underlying value. This is known as `dereferencing` or `indirecting`.
  ```go
  i, j := 42, 2701

  p := &i         // point to i
  fmt.Println(*p) // read i through the pointer
  *p = 21         // set i through the pointer
  fmt.Println(i)  // see the new value of i

  p = &j         // point to j
  *p = *p / 37   // divide j through the pointer
  fmt.Println(j) // see the new value of j
  ```

- [Pointers in go](https://www.digitalocean.com/community/conceptual_articles/understanding-pointers-in-go)

### Function Pointer Receivers

When you write a function, you can define arguments to be `passed either by value`, or `by reference`. 

Passing by value means that a `copy of that value is sent to the function`, and any changes to that argument within that function only effect that variable within that function, and not where it was passed from. 

However, if you pass by reference, meaning you pass a `pointer to that argument`, you can change the value from within the function, and also `change` the value of the `original variable` that was passed in.

- Example passing arguments by value
```go
package main

import "fmt"

type Creature struct {
    Species string
}

func main() {
    var creature Creature = Creature{Species: "shark"}

    fmt.Printf("1) %+v\n", creature)
    changeCreature(creature)
    fmt.Printf("3) %+v\n", creature)
}

func changeCreature(creature Creature) {
    creature.Species = "jellyfish"
    fmt.Printf("2) %+v\n", creature)
}
```

Output
```
1) {Species:shark}
2) {Species:jellyfish}
3) {Species:shark}
```

- Example passing arguments by reference
```go
package main

import "fmt"

type Creature struct {
    Species string
}

func main() {
    var creature Creature = Creature{Species: "shark"}

    fmt.Printf("1) %+v\n", creature)
    changeCreature(&creature)
    fmt.Printf("3) %+v\n", creature)
}

func changeCreature(creature *Creature) {
    creature.Species = "jellyfish"
    fmt.Printf("2) %+v\n", creature)
}
```

Output
```
1) {Species:shark}
2) &{Species:jellyfish}
3) {Species:jellyfish}
```

- Make sure you don’t have a `nil pointer` that was passed into your function or method.
for eg., Passing the pointer to a struct or any type without initializing it. In the below snippet, `creature`
variable's instance is not created.
```go
var creature *Creature
```

- Create an instance of `Creature` as follows to go no to panic,
```go 
var creature *Creature
creature = &Creature{Species: "shark"}
```

### Method Pointer Receivers

A receiver in go is the argument that is defined in a method declaration.
```go
type Creature struct {
    Species string
}

func (c Creature) String() string {
    return c.Species
}
```

The receiver in the above method is `c Creature`. It is stating that the `instance of c` is of type Creature and you will reference that type via that instance variable.

If you define a `method with a value receiver`, you are not able to make changes to the instance of that type that the method was defined on.

If you want the method to be able to update the instance of the variable, make the receiver a pointer.

```go
func (c *Creature) Reset() {
    c.Species = ""
}

var creature *Creature = Creature{Species: "shark"}

// creature will have the value Species as 'shark'

// Invoke on the Species type as follws
creature.reset()
// Prints the empty string after reset was executed
```

##  Structs

- Structs are collections of heterogenous data defined by programmers to organize information.

- A struct is a collection of fields.

- Struct fields are accessed using a dot `.`.

- Struct fields can be accessed through a struct pointer.
  ```go
  type Vertex struct {
    X int
    Y int
    z int
  }
  ```
- In the struct `Vertex` both fields `X`, `Y` are exported and `z` is not exported.
Only the fields that are starting with `Capital` letters are exported and can be accessed outside of the package and values can be set to those fields.

### Inline Structs

These are the on-the-fly struct definitions. Inline struct definitions appear on the right-hand side of a variable assignment. 

```go
package main

import "fmt"

func main() {
    c := struct {
        Name string
        Type string
    }{
        Name: "Sammy",
        Type: "Shark",
    }
    fmt.Println(c.Name, "the", c.Type)
}
```

Rather than defining a new type describing the struct with the `type` keyword. Define an inline struct by placing the `struct` definition immediately following the short-assignment operator, immediately supply another pair of braces and the values that each field will assume.

## Pointers to Structs

- To access the field X of a struct when we have the struct pointer p we could write `(*p).X`,
  that notation is cumbersome, so the language permits us instead to write just `p.X`, without the explicit dereference

### Struct Literals

- A struct literal denotes a newly allocated struct value by listing the values of its fields.

- List a subset of fields by using the Name: syntax. And the order of named fields is irrelevant.

- The special prefix `&` returns a pointer to the struct value.
  ```go
  var (
    v1 = Vertex{1, 2}  // has type Vertex
    v2 = Vertex{X: 1}  // Y:0 is implicit
    v3 = Vertex{}      // X:0 and Y:0
    p2 = &Vertex{1, 2} // has type *Vertex
  )
  ```

## Struct Tags

Struct tags are small pieces of `metadata` attached to `fields of a struct` that provide instructions to other Go code that works with the struct.

Struct tags have no effect on the operation of your code without some other code that examines them.
```go
type User struct {
    Name string `example:"name"`
}
```

The standard library has packages that use struct tags as part of their operation. The most popular of these is the `encoding/json` package.

### Encoding JSON

JSON is commonly used to `communicate data between different programs` as the format is simple enough that libraries exist to decode it in many different languages.

- Convert the strcut type to a json notation without using the struct tags, but the output has keys starting with capital letter
```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "os"
    "time"
)

type User struct {
    Name          string 
    Password      string
    PreferredFish []string 
    CreatedAt     time.Time
}

func main() {
    u := &User{
        Name:      "Sammy the Shark",
        Password:  "fisharegreat",
        CreatedAt: time.Now(),
    }

    out, err := json.MarshalIndent(u, "", "  ")
    if err != nil {
        log.Println(err)
        os.Exit(1)
    }

    fmt.Println(string(out))
}
```

- Output
```
{
  "Name": "Sammy the Shark",
  "Password": "fisharegreat",
  "CreatedAt": "2019-09-23T15:50:01.203059-04:00"
}
```

- Changing the fields of `Name` struct to use camel case while declaring, the above code prints `{}`, `json.MarshalIndent()` because of the visibility of the field outside of the package of `encoding/json`.

### Use tags to control encoding

- Program to convert to json format using struct tags
```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "os"
    "time"
)

type User struct {
    Name          string    `json:"name"`
    Password      string    `json:"password"` // add - instead of password to treat this field as a private field while displaying    
    PreferredFish []string  `json:"preferredFish,omitempty"` // add omitempty to remove empty JSON values
    CreatedAt     time.Time `json:"createdAt"`
}

func main() {
    u := &User{
        Name:      "Sammy the Shark",
        Password:  "fisharegreat",
        CreatedAt: time.Now(),
    }

    out, err := json.MarshalIndent(u, "", "  ")
    if err != nil {
        log.Println(err)
        os.Exit(1)
    }

    fmt.Println(string(out))
}
```

- Output
```
{
  "name": "Sammy the Shark",
  "password": "fisharegreat",
  "preferredFish": null, 
  "createdAt": "2019-09-23T18:16:17.57739-04:00"
}
```

- Add `omitempty` string to the `PreferredFish` field as `json:"preferredFish,omitempty"` in the struct to remove the `empty` or `null` values

- `Ignoring private fields`: Use `-` special value in the tag, as  `json:"-"` to ignore the password field.
## Array

- The type `[n]T` is an array of n values of type T.

- An array's `length` is part of its type, so arrays cannot be resized.

### Slices

- An array has a fixed size. A `slice`, on the other hand, is a dynamically-sized,
  flexible view into the elements of an array. In practice, slices are much more common than arrays.

- A slice is formed by specifying two indices, a low and high bound, separated by a colon `:`
  ```
  a[low : high]
  ```

- Slices are like `references to arrays`

- A slice `does not store` any data, it just describes a section of an underlying array.

- Changing the elements of a slice modifies the corresponding elements of its underlying array.
  Other slices that share the same underlying array will see those changes.

### Slice Literals

- A slice literal is like an array literal without the length.

- This is an array literal
  ```go
  [3]bool{true, true, false}
  ```

- And this creates the same array as above, then builds a slice that references it:
  ```go
  []bool{true, true, false}
  ```

### Slice Defaults

- When slicing, may omit the `high` or `low` bounds to use their defaults instead.

- The default is zero for the low bound and the length of the slice for the high bound.

- These slice expressions are equivalent
  ```go
  a[0:10]
  a[:10]
  a[0:]
  a[:]
  ```

### Slice Length and Capacity

- A slice has both a `length` and a `capacity`.

- The `length` of a slice is the number of elements it contains.

- The `capacity` of a slice is the number of elements in the underlying array,
  counting from the first element in the slice.

- The length and capacity of a slice s can be obtained using the expressions `len(s)` and `cap(s)`.

- Extend a slice's length by re-slicing it, provided it has sufficient capacity

### Creating a Slice with make function

- Slices can be created with the built-in `make` function; this is how to create dynamically-sized arrays.

- The `make` function `allocates a zeroed array` and returns a slice that refers to that array
  ```go
  a := make([]int, 5)  // len(a)=5
  ```

- To specify a capacity, pass a third argument to make:
  ```go
  b := make([]int, 0, 5) // len(b)=0, cap(b)=5
  b = b[:cap(b)]         // -len(b)=5, cap(b)=5
  b = b[1:]              // -len(b)=4, cap(b)=4
  ```


### Slices of Slices

- Slices can contain any type, including other slices.
  ```go
  // tic-tac-toe board
  board := [][]string{
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
  }
  ```

### Appending to a Slice

- It is common to append new elements to a slice, and so Go provides a built-in `append` function
  ```go
  func append(s []T, vs ...T) []T
  ```

- The first parameter `s` of append is a slice of type T, and the rest are T values to append to the slice.
  ```go
  var s2 []int
  printSlice(s2)s

  // append works on nil slices.
  s2 = append(s2, 0)
  printSlice(s2)
  ```

- The resulting value of append is a slice containing all the elements of the original slice plus the provided values.

- If the backing array of `s` is too small to fit all the given values a `bigger array will be allocated`.

- The returned slice will `point to the newly allocated array`.

### Range

- The `range` form of the `for` loop iterates over a slice or map.

- When `ranging` over a slice, `two values are returned` for each iteration.
  The first is the `index`, and the second is a `copy of the element` at that index.
  ```go
  var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

  func main() {
    for i, v := range pow {
      fmt.Printf("2**%d = %d\n", i, v)
    }
  }
  ```

- Skip the `index` or `value` by assigning to `_`

- Only want the `index`, omit the `second` variable.
  ```go
  pow := make([]int, 10)
  for i := range pow {
    pow[i] = 1 << uint(i) // == 2**i
  }
  for _, value := range pow {
    fmt.Printf("%d\n", value)
  }
  ```

## Maps

- A map maps keys to values.

- The `zero value` of a map is `nil`. A `nil` map has `no keys`, nor can keys be added.

- The `make` function returns a map of the given type, initialized and ready for use.
  ```go
  type Vertex struct {
	Lat, Long float64
  }

  var m map[string]Vertex

  func main() {
  	m = make(map[string]Vertex)
  	m["Bell Labs"] = Vertex{
  		40.68433, -74.39967,
  	}
  	fmt.Println(m["Bell Labs"])
  }
  ```

- Map literals are like struct literals, but the keys are required.
  ```go
  var m = map[string]Vertex{
    "Bell Labs": Vertex{
      40.68433, -74.39967,
    }
    "Google": Vertex{
      37.42202, -122.08408,
    },
  }
  ```

- If the `top-level type` is just a `type name`, `omit it from the elements` of the literal.
  ```go
  var m = map[string]Vertex{
    "Bell Labs": {40.68433, -74.39967},
    "Google":    {37.42202, -122.08408},
  }
  ```

### Mutating Maps

- Insert or update an element in map m:
  ```
  m[key] = elem
  ```

- Retrieve an element
  ```
  elem = m[key]
  ```

- Delete an element
  ```
  delete(m, key)
  ```

- Test that a `key` is present with a two-value assignment
  ```
  elem, ok = m[key]
  ```

  - If `key` is in `map`, `ok` is true. If not, ok is false.
  - If `key` is not in the map, then `elem` is the `zero value` for the map's element type.

> Note: If `elem` or `ok` have not yet been declared you could use a short declaration form:
  `elem, ok := m[key]`

## Function Values

- Functions are values too. They can be passed around just like other values.

- Function values may be used as function arguments and return values.
  ```go
  func compute(fn func(float64, float64) float64) float64 {
    return fn(3, 4)
  }

  hypot := func(x, y float64) float64 {
    return math.Sqrt(x*x + y*y)
  }

  fmt.Println(compute(hypot))
  fmt.Println(compute(math.Pow))
  ```

## Function closures

- Go functions may be closures. A closure is a function value that references variables from outside its body.

- The function may access and assign to the referenced variables; in this sense the function is "bound" to the variables.
  ```go
  func adder() func(int) int { // func(int) int, is the return type of the func adder()
    sum := 0
    return func(x int) int {
      sum += x
      return sum
    }
  }

  func main() {
    // Executing 2 different adders to verify the closure behavior
    pos, neg := adder(), adder()
    for i := 0; i < 10; i++ {
      fmt.Println(
        pos(i),
        neg(-2*i),
      )
    }
  }
  ```

## Methods

- Go `does not have classes`. However, you can define methods on `types`.

- A method is a function with a special `receiver` argument.

- Methods purpose is to operate on `instances of some specific type`, called a `receiver`. Adding methods to types allows you to communicate not only what the data is, but also how that data should be used.

- The receiver appears in its own argument list between the func keyword and the method name.

- The receiver is a declaration of the type that you wish to define the method on.
```go
type Vertex struct {
  X, Y float64
}

func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

v := Vertex{3, 4}
fmt.Println(v.Abs())

// Methods can also be called by passing instance to the method
fmt.Println(Vertex.Abs(v))
```

- Method is a `function` with a `receiver` argument, same can be written as,
  ```go
  func Abs(v Vertex) float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
  }

  v := Vertex{3, 4}
  fmt.Println(Abs(v))
  ```

- Method can be declared on `non-struct types`, too.
  ```go
  type MyFloat float64

  func (f MyFloat) Abs() float64 {
    if f < 0 {
      return float64(-f)
    }
    return float64(f)
  }
  ```

- Method can be declared with a `receiver` whose type is defined in the `same package` as the method.

- Example to chain the methods and call them using dot notation and passing type to the method
```go
package main

import "fmt"

type Creature struct {
    Name     string
    Greeting string
}

func (c Creature) Greet() Creature {
    fmt.Printf("%s says %s!\n", c.Name, c.Greeting)
    return c
}

func (c Creature) SayGoodbye(name string) {
    fmt.Println(name, "says, farewell to", c.name, "!")
}

func main() {
    sammy := Creature{
        Name:     "Sammy",
        Greeting: "Hello!",
    }
    sammy.Greet().SayGoodbye("gophers")

    Creature.SayGoodbye(Creature.Greet(sammy), "gophers")
}
```

- In the above example, `Greet()` method returns the instance of Creature so that we can chain the method invocation as 
shown, `sammy.Greet().SayGoodbe('Sammy')`

### Pointer receivers

- It is possible to declare methods with `pointer receivers`. This means the receiver type has the literal syntax `*T` for some type T.
  (Also, T cannot itself be a pointer such as `*int`)
  ```go
  func (v *Vertex) Scale(f float64) { // try without the pointer to check the behavior of the method
    v.X = v.X * f
    v.Y = v.Y * f
  }
  ```

- Methods with pointer receivers `can modify the value` to which the receiver points.

## Methods and pointer indirection

- Functions with a pointer argument must take a pointer
  ```go
  func ScaleFunc(v *Vertex, f float64) {
    v.X = v.X * f
    v.Y = v.Y * f
  }

  ScaleFunc(&v, 5)
  ```

- While methods with pointer receivers `take either a value` or `a pointer as the receiver` when they are called
  ```go
  v := Vertex{3,4}
  v.Scale(5)

  p := &Vertex{4, 3} // or &v
  p.Scale(10) // OK
  ```

- Functions that take a `value argument` must take a value of that specific type
  ```go
  func AbsFunc(v Vertex) float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
  }

  v := Vertex{3,4}
  fmt.Println(AbsFunc(v))  // OK
  fmt.Println(AbsFunc(&v)) // Compile error!
  ```

- While methods with `value receivers` take either a `value` or a `pointer` as the receiver when they are called
  ```go
  v := Vertex{3,4}
  fmt.Println(v.Abs()) // OK

  p := &v
  fmt.Println(p.Abs()) // OK
  ```

### Choosing a value or pointer receiver

- There are two reasons to use a pointer receiver.
  - The method can `modify the value` that its receiver points to.
  - `Avoid copying` the value on each method call. This can be more efficient if the receiver is a large struct.

- In general, all methods on a given type should have either value or pointer receivers, but `not a mixture of both`.

### User input - Accepting input from standard input

```go
// Helper function to read the value from the stdin
func getInput(prompt string, r *bufio.Reader) (string, error) {
  fmt.Print(prompt)
  input, err := r.ReadString('/n')

  return strings.TrimSpace(input), err
}

reader := bufio.NewReader(os.Stdin)
fmt.Print("Enter a name: ")
name, err := reader.ReadString('\n') // Read the value after user enters the new line key
name = strings.TrimSpace(name)

age, err := getInput("Enter your age: ", reader)
fmt.Print(name, age)
```

## Interfaces

An interface type is a specification of methods used by the compiler to guarantee that a type provides implementations for those methods. Any type that has methods with the same name, same parameters, and same return values as those found in an interface’s definition are said to implement that interface and are allowed to be assigned to variables with that interface’s type.

- An `interface type` is defined as a `set of method signatures`.

- A value of interface type can hold any value that `implements` those methods.

- Interfaces are implemented `implicitly`

- A type implements an interface by implementing its methods. There is `no explicit declaration` of intent, `no implements` keyword.

- Implicit interfaces decouple the definition of an interface from its implementation,
  which could then appear in any package without pre arrangement.

### Interface Values

- Under the hood, interface values can be thought of as a `tuple` of a `value` and a `concrete type`
  (value, type)

- An interface value holds a value of a specific underlying concrete type.

- Calling a method on an interface value executes the method of the same name on its underlying type.
  ```go
  type I interface {
    M()
  }

  type T struct {
    S string
  }

  func (t *T) M() {
    fmt.Println(t.S)
  }

  var i I

  i = &T{"Hello"}
  i.M()

  fmt.Printf("(%v, %T)\n", i, i)
  ```

### Interface values with nil underlying values

- If the `concrete value` inside the interface itself is `nil`, the method will be called with a nil receiver.

- In some languages this would trigger a `null pointer exception`, but in Go it is common to write methods
  that gracefully handle being called with a nil receiver.

- Note that an `interface value` that holds a `nil concrete value` is itself non-nil.
  ```go
  func (t *T) M() {
    if t == nil {
      fmt.Println("<nil>")
      return
    }
    fmt.Println(t.S)
  }

  var i I

  var t *T
  i = t

  i.M()
  fmt.Printf("(%v, %T)\n", i, i) // returns (<nil>, *main.T), <nil>
  ```

### Nil Interface Values

- A `nil interface value` holds neither value nor concrete type.

- Calling a method on a nil interface is a `run-time error` because there is no type inside the
  interface tuple to indicate which concrete method to call.

### The Empty Interface

- The interface type that specifies `zero methods` is known as the empty interface
  `interface{}`

- An empty interface may `hold values of any type`. (Every type implements at least zero methods.)

- Empty interfaces are used by code that handles values of `unknown type`
  ```go
  var i interface{}
  fmt.Printf("(%v, %T)\n", i, i) // returns (<nil>, <nil>)

  i = 42
  fmt.Printf("(%v, %T)\n", i, i) // returns (42, int)

  i = "hello"
  fmt.Printf("(%v, %T)\n", i, i) // returns (hello, string)
  ```

## Stringers

- One of the most ubiquitous interfaces is `Stringer` defined by the `fmt` package.
  ```go
  type Stringer interface {
    String() string
  }
  ```

- A Stringer is `a type` that can describe `itself as a string`. The `fmt` package look for this interface to print values.

## Errors

- Go programs express error state with `error` values. The `error type` is a built-in interface
  ```go
  type error interface {
    Error() string
  }
  ```

- Functions often return an `error value`, and calling code should handle errors by testing whether the error equals `nil`.
  ```go
  i, err := strconv.Atoi("42") // strconv can be used to parse string values to appropriate types for eg., strconv.ParseFloat(item, 64)
  if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
    return
  }

  fmt.Println("Converted integer:", i)
  ```

- A `nil` error denotes `success`; a `non-nil` error denotes `failure`.

## Readers

- The `io` package specifies the `io.Reader` interface, which represents the read end of a stream of data.

- The `io.Reader` interface has a `Read` method:
  ```go
  func (T) Read(b []byte) (n int, err error)
  ```

- Read populates the given `byte slice` with data and returns the number of bytes populated and an error value.
  It returns an `io.EOF` error when the stream ends.


## Goroutines

- A `goroutine` is a `lightweight thread` managed by the Go runtime.
  ```go
  go f(x, y, z)
  ```

- starts a new goroutine running
  ```
  f(x, y, z)
  ```

- The evaluation of f, x, y, and z happens in the `current goroutine` and the execution of `f` happens in the new goroutine.

- Goroutines `run` in the `same address space`, so access to shared memory must be `synchronized`.

Use `-race` flag to print out the log on the console if there are any race conditions in the code written
```
$ go run -race main.go
```

## Channels

- Channels are a `typed conduit` through which you can `send` and `receive` values with the channel operator, `<-`
  ```go
  ch <- v    // Send v to channel ch.
  v := <-ch  // Receive from ch, and assign value to v.
  ```

- The data flows in the direction of the arrow.

- Like maps and slices, channels must be created before use:
  ```go
  ch := make(chan int)
  ```

- By default, `sends` and `receives` block until the other side is ready.
  This allows goroutines to `synchronize` without explicit locks or condition variables.

- The example code sums the numbers in a slice, distributing the work between two goroutines.
  Once both goroutines have completed their computation, it   calculates the final result.
  ```go
  func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
      sum += v
    }
    c <- sum // send sum to c
  }

  func main() {
    s := []int{7, 2, 8, -9, 4, 0}

    c := make(chan int)
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    x, y := <-c, <-c // receive from c

    fmt.Println(x, y, x+y)
  }
  ```

### Buffered Channels

- Channels can be `buffered`. Provide the `buffer length` as the second argument to `make` to initialize a buffered channel:
  ```go
  ch := make(chan int, 100)
  ```

- Sends to a buffered channel block only when the `buffer is full`. Receives block when the `buffer is empty`.

## Range and Close

- A `sender` can `close` a channel to indicate that no more values will be sent.
  Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression: after
  ```go
  v, ok := <-ch
  ```
  - `ok` is `false` if there are `no more values` to receive and the channel is closed.

- The loop `for i := range c` receives values from the channel repeatedly until it is closed.

> Note: Only the `sender should close a channel`, never the receiver. Sending on a closed channel will cause a panic.

> Another note: Channels aren't like files; you don't usually need to close them.
  Closing is only necessary when the receiver must be told there are no more values coming, such as to terminate a range loop.

## Select

- The `select` statement lets a goroutine `wait on multiple communication operations`.

- A `select` `blocks` until one of its cases can run, then it executes that case.
  It chooses one at random if multiple are ready.

### Default Selection

- The `default` case in a `select` is run if no other case is ready.

- Use a default case to try a send or receive `without blocking`
  ```go
  select {
    case i := <-c:
    // use i
    default:
    // receiving from c would block
  }
  ```
## https://astaxie.gitbooks.io/

### iota 

- Go has one keyword called `iota`, this keyword is to make `enum`, it begins with 0, increased by 1.
```go
const(
    x = iota  // x == 0
    y = iota  // y == 1
    z = iota  // z == 2
    w  // If there is no expression after the constants name, it uses the last expression,
    //so it's saying w = iota implicitly. Therefore w == 3, and y and z both can omit "= iota" as well.
)

const v = iota // once iota meets keyword `const`, it resets to `0`, so v = 0.

const (
  e, f, g = iota, iota, iota // e=0,f=0,g=0 values of iota are same in one line.
)
```

- Define variables or const by a group 
```go
const(
    i = 100
    pi = 3.1415
    prefix = "Go_"
)

var(
    i int
    pi float32
    prefix string
)
```

### Arrays 

- When you use `arrays` as arguments, `functions get their copies instead of references`. If you want to use references, use `slice` instead.

```go
b := [10]int{1, 2, 3}
// define a int array with 10 elements, of which the first three are assigned.
//The rest of them use the default value 0.

c := [...]int{4, 5, 6} // use `…` to replace the length parameter and Go will calculate it for you.

// define a two-dimensional array with 2 elements, and each element has 4 elements.
doubleArray := [2][4]int{[4]int{1, 2, 3, 4}, [4]int{5, 6, 7, 8}}

// The declaration can be written more concisely as follows.
easyArray := [2][4]int{{1, 2, 3, 4}, {5, 6, 7, 8}}
```

### Slice

- slice a reference type. slice points to an underlying array whose declaration is similar to array, but doesn't need length.

- Any changes will affect other variables pointing to the same slice or array.

- slice is like a `struct` by definition and it contains 3 parts.
  - A pointer that points to where slice starts.
  - The length of slice.
  - Capacity, the length from start index to end index of slice

- There are some `built-in` functions for slice.
  - `len` gets the length of slice.
  - `cap` gets the maximum length of slice
  - `append` appends one or more elements to slice, and returns slice .
  - `copy` copies elements from one slice to the other, and returns the number of elements that were copied.

> append will change the array that slice points to, and affect other slices that point to the same array. Also, if there is not enough length for the slice ((cap-len) == 0), append returns a new array for this slice. When this happens, other slices pointing to the old array will not be affected

### map

- 

### Building for different OSs and architectures

To find the list of possible platforms, run the following:
```
$ go tool dist list
```

- Sample output
```
darwin/386       
darwin/amd64     
darwin/arm
darwin/arm64 
windows/386
windows/amd64
windows/arm
```

The output is a set of `key-value pairs` separated by a `/`. 
The first part of the combination, before the /, is the `operating system`. 
In Go, these operating systems are possible values for the environment variable `GOOS`, which stands for Go Operating System. 
The second part, after the /, is the `architecture`.
These are all possible values for an environment variable, `GOARCH`, and stands for Go Architecture.

- To know the OS and architecture you are developing the code, run
```
$ go env GOOS GOARCH
```

- Outputs `darwin` and `arm64` if you are on Apple M1

- Pass GOOS and GOARCH while building the app to build it for specific OS and architecture
```
$ GOOS=linux GOARCH=ppc64 go build
```

### Libraries

- [sockets inspired by js lib](https://github.com/googollee/go-socket.io)

- [gorilla/websocket](https://github.com/gorilla/websocket) - Websockets 

- [mux](https://github.com/gorilla/mux) - HTTP Router

- [gin](https://github.com/gin-gonic/gin) - HTTP Web Framework

- [gofiber](https://gorm.io/)  - expres.js inspired web framework

- [env-variables](github.com/joho/godotenv) - To read env variables from `.env files`, inspired by JS's dotenv package

- [gorm](https://gorm.io/) - ORM for `sqlite`, `MySQL`, and `PostgreSQL`