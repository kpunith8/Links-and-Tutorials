## Refactoring Improving the Design of the existing Code - Martin Flower

- A change made to the internal structure of software to make it
  easier to understand and cheaper to modify without changing its observable behavior

- To restructure software by applying a series of refactorings
  without changing its observable behavior.

### Benefits

- Improves the Design of Software

- Makes Software Easier to Understand

- Helps to find the bugs easily

- Helps to program faster

### Quotes

- `if it ain't broke, don't fix it.`

- When you find you have to add a feature to a program, and the program's code is
  not structured in a convenient way to add the feature, first refactor the program
  to `make it easy to add the feature`, then `add the feature`.

- Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

- `I'm not a great programmer; I'm just a good programmer with great habits.` - Kent Beck

- `For each desired change, make the change easy, then make the easy change` — Kent Beck

## First Step

- Before you start refactoring, check that you have a `solid suite of tests`.
  These tests `must be self-checking`.

### Decomposing and Redistributing

- Decompose the method into `smaller pieces`. Smaller pieces of code tend to make things more manageable

- Split up the long method and move the pieces to better classes.

- Any `non-modified variable` can be passed in as a `parameter`.

- Good code `should communicate what it is doing` clearly, and `variable names` are a `key` to clear code.
  Never be afraid to `change the names` of things to improve clarity.

- In most cases a `method should be on the object whose data it uses`.

### Replacing the Conditional Logic with Polymorphism

- The first part of this problem is that `switch` statement. It is a bad idea to
  do a switch based on an `attribute of another object`. If you must use a switch statement,
  it should be on your own data, not on someone else's.

- Refactoring indicating that the code should, overall, `do just the same things it did before` when
  refactoring started. It doesn’t mean it will work exactly the same — for example, Extract Function
  will `alter the call stack`, so `performance characteristics` might change — but nothing
  should change that the user should care about.

- Refactoring is always done to make the code `easier to understand and cheaper to modify.`
