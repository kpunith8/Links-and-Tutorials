## Refactoring Improving the Design of the existing Code - Martin Flower

- `if it ain't broke, don't fix it.`

- When you find you have to add a feature to a program, and the program's code is
  not structured in a convenient way to add the feature, first refactor the program
  to `make it easy to add the feature`, then `add the feature`.

## First Step

- Before you start refactoring, check that you have a `solid suite of tests`.
  These tests `must be self-checking`.


### Decomposing and Redistributing

- Decompose the method into `smaller pieces`. Smaller pieces of code tend to make things more manageable

- Split up the long method and move the pieces to better classes.

- Any `non-modified variable` can be passed in as a `parameter`.

- Good code `should communicate what it is doing` clearly, and `variable names` are a `key` to clear code.
  Never be afraid to `change the names` of things to improve clarity.

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

- In most cases a `method should be on the object whose data it uses`.

```java
class Customer {
  private double amountFor(Rental aRental) {
    return aRental.getCharge();
  }
}
```

### Replacing the Conditional Logic with Polymorphism

- The first part of this problem is that `switch` statement. It is a bad idea to
  do a switch based on an `attribute of another object`. If you must use a switch statement,
  it should be on your own data, not on someone else's.

- 
