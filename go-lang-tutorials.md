# Go Lang

## Functions

- It should have `main()` function to execute the code

- Function with 2 params and type at last
  ```
  func add(x int, y int) int {
    return x + y
  }
  ```

- When two or more consecutive named function parameters `share a type`, `omit the type from all but the last`.
  ```
  func add(x, y int) int {}
  ```

- A function can return any number of results
  ```
  func swap(x, y string) (string, string) {
    return y, x
  }
  ```

- Return values may be `named`. If so, they are treated as `variables` defined at the top of the function.
  These names should be used to document the meaning of the return values.

- A return statement `without arguments` returns the named return values. This is known as a `naked return`.

- Naked return statements should be `used only in short functions`. They can harm readability in longer functions.
  ```
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
  ```
  var c, python, java bool
  ```

### Variable Initializers

- A var declaration can include initializers, one per variable.
  ```
  var val1, val2 int = 12, 22
  ```

- If an initializer is present, the `type can be omitted`; the variable will take the type of the initializer.
  ```
  var c1, python1, java1 = true, false, "no!"
  ```

- Variable declarations may be `factored` into blocks, as with import statements.
  ```
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
  ```
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
  ```
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
  ```
  const Pi = 3.14
  const Truth = true
  ```

## Defer

- A `defer` statement defers the execution of a function until the surrounding function returns.

- The deferred call's arguments are evaluated immediately, but the function call is not
  executed until the surrounding function returns.
  ```
  defer fmt.Println("Defer")
  ```

## For

- For loop can have `init`, `post` and `condition` statements
  ```
  sum := 0
  for i := 0; i < 10; i++ {
    sum += i
  }
  ```

- The init and post statements are optional. It can also be used as `while`
  ```
  sum1 := 1
  for sum1 < 1000 {
    sum1 += sum1
  }
  ```

- Omit the `loop condition` it loops forever, so an `infinite` loop is compactly expressed, like `while`
  ```
  for { // infinite loop
  }
  ```

## If with a Short Statement

- Like `for`, the `if` statement can start with a short statement to execute before the condition.

- Variables declared by the if statement are only `in scope until the end of the if`
  ```
  func powerOfX(x, n, limit float64) float64 {
    if v := math.Pow(x, n); v < limit {
      return v
    }
    return limit
  }
  ```

## If and Else

- Variables declared inside an if short statement are also available inside any of the else blocks.
  ```
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

## Pointers

- A pointer holds the memory address of a value.

- The type `*T` is a pointer to a T value. Its zero value is `nil`.

- The `&` operator generates a pointer to its operand.

- The `*` operator denotes the pointer's underlying value. This is known as `dereferencing` or `indirecting`.
  ```
  i, j := 42, 2701

  p := &i         // point to i
  fmt.Println(*p) // read i through the pointer
  *p = 21         // set i through the pointer
  fmt.Println(i)  // see the new value of i

  p = &j         // point to j
  *p = *p / 37   // divide j through the pointer
  fmt.Println(j) // see the new value of j
  ```

##  Structs

- A struct is a collection of fields.

- Struct fields are accessed using a dot `.`.

- Struct fields can be accessed through a struct pointer.
  ```
  type Vertex struct {
    X int
    Y int
  }
  ```

## Pointers to Structs

- To access the field X of a struct when we have the struct pointer p we could write `(*p).X`,
  that notation is cumbersome, so the language permits us instead to write just `p.X`, without the explicit dereference

### Struct Literals

- A struct literal denotes a newly allocated struct value by listing the values of its fields.

- List a subset of fields by using the Name: syntax. And the order of named fields is irrelevant.

- The special prefix `&` returns a pointer to the struct value.
  ```
  var (
    v1 = Vertex{1, 2}  // has type Vertex
    v2 = Vertex{X: 1}  // Y:0 is implicit
    v3 = Vertex{}      // X:0 and Y:0
    p2 = &Vertex{1, 2} // has type *Vertex
  )
  ```

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
  ```
  [3]bool{true, true, false}
  ```

- And this creates the same array as above, then builds a slice that references it:
  ```
  []bool{true, true, false}
  ```

### Slice Defaults

- When slicing, may omit the `high` or `low` bounds to use their defaults instead.

- The default is zero for the low bound and the length of the slice for the high bound.

- These slice expressions are equivalent
  ```
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
  ```
  a := make([]int, 5)  // len(a)=5
  ```

- To specify a capacity, pass a third argument to make:
  ```
  b := make([]int, 0, 5) // len(b)=0, cap(b)=5
  b = b[:cap(b)]         // -len(b)=5, cap(b)=5
  b = b[1:]              // -len(b)=4, cap(b)=4
  ```


### Slices of Slices

- Slices can contain any type, including other slices.
  ```
  // tic-tac-toe board
  board := [][]string{
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
  }
  ```

### Appending to a slice:

- It is common to append new elements to a slice, and so Go provides a built-in `append` function
  ```
  func append(s []T, vs ...T) []T
  ```

- The first parameter `s` of append is a slice of type T, and the rest are T values to append to the slice.
  ```
  var s2 []int
  printSlice(s2)s

  // append works on nil slices.
  s2 = append(s2, 0)
  printSlice(s2)
  ```

- The resulting value of append is a slice containing all the elements of the original slice plus the provided values.

- If the backing array of `s` is too small to fit all the given values a `bigger array will be allocated`.

- The returned slice will `point to the newly allocated array`.

### Range:

- The `range` form of the `for` loop iterates over a slice or map.

- When `ranging` over a slice, `two values are returned` for each iteration.
  The first is the `index`, and the second is a `copy of the element` at that index.
  ```
  var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

  func main() {
    for i, v := range pow {
      fmt.Printf("2**%d = %d\n", i, v)
    }
  }
  ```
