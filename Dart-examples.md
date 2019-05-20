## Dart Programming basics and Sample Examples

### Importing packages

- Importing packages
  ```javascript
  import 'dart:io';
  // Needs to add pubspec.yaml file to specify the dependency
  import 'package:meta/meta.dart';
  ```

### Example `pubspec.yaml`

- Sample yaml file
  ```yaml
  name: my_sample_app
  version: 1.0.0
  description: >-
    Sample dart app for learing purpose
  author: Punith K
  dependencies:
    meta: ^1.1.7
  ```

### Variables

- Different variable types
  ```javascript
  var name = 'Punith';
  var intNumber = 23;
  var floatNumber = 2.4;
  var arrayData = ['Punith', 25, 33];
  var objectSample = {'name': 'Punith', 'age': 23};
  var year = 2019;
  var isTrue = true;
  ```

- `final` variables cannot be changed
  ```javascript
  final String bob = 'Uncle bob';
  final bob = 'Bob';
  ```

- A `final` variable can be set only once; a `const` variable is a compile-time constant.

- `const` variables are `implicitly final`. A final top-level or class variable is initialized the first time it’s used.

- Use `const` for variables that you want to be `compile-time constants`. If the const variable is at the `class level`, mark it `static const`.
Where you declare the variable, set the value to a compile-time constant such as a number or string literal, a const variable, or the result of an arithmetic operation on constant numbers:
  ```javascript
  const bar = 1000000; // Unit of pressure (dynes/cm2)
  const double atm = 1.01325 * bar; //  Standard atmosphere
  ```

- The `const` keyword isn’t just for declaring constant variables. You can also use it to create constant values, as well as to `declare constructors` that create constant values. Any variable can have a constant value.
  ```javascript
  var foo = const [];
  final bar1 = const [];
  const baz = []; // Equivalent to `const []`
  ```

- You can omit `const` from the initializing expression of a const declaration, like for baz above.

- You can change the value of a `non-final, non-const` variable, even if it used to have a const value.

- You can’t change the value of a const variable

### Built-in types

- The Dart language has special support for the following types:
  - Numbers
  - Strings
  - Booleans
  - Lists (also known as Arrays)
  - Sets
  - Maps
  - Runes (for expressing Unicode characters in a string)
  - Symbols

#### Numbers

- Numbers have 2 flavours

  - int - Integer values no larger than 64 bits, depending on the platform.
    - On the Dart VM, values can be from `-2^63 to 2^63-1`.
    - Dart that’s compiled to `JavaScript` uses JavaScript numbers, allowing values from `-2^53 to 2^53-1`.
    - Integers are numbers without a decimal point.
    ```javascript
    var x = 1;
    var hex = 0xDEADBEEF;
    ```

  - double -` 64-bit` (double-precision) floating-point numbers, as specified by the `IEEE-754` standard.
    - Both int and double are subtypes of num.
    - If a number includes a decimal, it is a double.
    ```javascript
    var y = 1.1;
    var exponents = 1.42e5;
    ```

- As of `Dart 2.1`, integer literals are `automatically converted to doubles` when necessary
  ```javascript
  double z = 1; //  Equivalent to double z = 1.0.
  ```

#### Convert string into a number, or vice versa

- Conversion of a string to number or vice versa
  ```javascript
  // String to int
  var one = int.parse('1');

  // String to double
  var onePointOne = double.parse('1.1');

  // int to String
  String oneAsString = 1.toString();

  // double -> String
  String piAsString = 3.14159.toStringAsFixed(2);
  ```

- Put the value of an expression inside a string by using `${expression}`.

- If the expression is an `identifier`, you can `skip the {}`. To get the string corresponding to an object, Dart calls the object’s `toString()` method.
  ```javascript
  var s = 'string interpolation';
  ```

- Create a `multi-line` string: use a `triple quote` with either single or double quotation marks
  ```javascript
  var s1 = '''
  You can create
  multi-line strings like this one.
  ''';

  var s2 = """This is also a
  multi-line string.""";
  ```

- Create a `raw` string by prefixing it with `r`
  ```javascript
  var rawStr = r'In a raw string, not even \n gets special treatment.';
  ```

### Lists

- Perhaps the most common collection in nearly every programming language is the array, or ordered group of objects.

- In Dart, arrays are List objects, so most people just call them lists.

- Dart list literals look like JavaScript array literals.
  ```javascript
  var list = [1, 2, 3];
  ```
- Dart `infers` that list has type `List<int>`.

- If you try to add non-integer objects to this list, the analyzer or runtime raises an error

#### Spread Operator(...)

- Spread operator to copy the data from one arrray to another, like the one in JavaScript
  ```javascript
  var list2 = [0, ...list];
  ```

- If the expression to the `right of the spread operator might be null`, you can avoid exceptions by using a `null-aware spread operator ...?`.
  ```
  var nullList;
  var list3 = [0, ...?nullList];
  ```

- `Dart 2.3` introduced `collection if` and `collection for`, which you can use to build collections using `conditionals if` and `repetition for`.

  - Here’s an example of using `collection if` to create a list with three or four items in it
    ```javascript
    var promoActive = true;
    var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];
    ```

  - Here’s an example of using `collection for` to manipulate the items of a list before adding them to another list
  ```javascript
  var listOfInts = [1, 2, 3];
  var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
  ```

### Sets

- A set in Dart is an `unordered collection of unique items`.

- Dart support for sets is provided by set literals and the Set type.
  ```javascript
  var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
  ```

- To create an empty set, use `{}` preceded by a `type argument`, or assign {} to a variable of type Set.
  ```javascript
  var names = <String>{};
  Set<String> names = {}; // This works, too.
  var names = {}; // Creates a map, not a set.
  ```
- `Set or map?` The syntax for map literals is similar to that for set literals. Because map literals came first, `{} defaults to the Map` type.

- If you forget the type annotation on {} or the variable it’s assigned to, then Dart creates an object of type` Map<dynamic, dynamic>`.

- Add items to an existing set using the `add()` or `addAll()` methods
  ```JavaScript
  var elements = <String>{};
  elements.addAll(halogens);
  elements.add('fluorine');
  ```

- Use `.length` to get the number of items in the set.

- Dart `infers` that halogens has the `type Set<String>`.

- If you try to add the wrong type of value to the set, the analyzer or runtime raises an error.

- To create a set that’s a `compile-time constant`, add const before the set literal
  ```javascript
  final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
  };
  ```

### Maps

- A map is an object that associates `keys and values`.

- Both keys and values can be any type of object. Each `key occurs only once`, but you can use the same value multiple times.

- Dart support for maps is provided by map literals and the Map type.
  ```javascript
  var nobleGases = {
    2: 'helium',
    10: 'neon',
    18: 'argon',
  };
  ```

- Dart `infers` that nobleGases has the `type Map<int, String>`.

- If you try to add the wrong type of value to either map, the analyzer or runtime raises an error

- Create the same objects using a Map constructor
  ```javascript
  var nobleGases1 = Map();
  ```

- You might expect to see `new Map()` instead of just Map(). As of` Dart 2, the new keyword is optional`.

-  Both map and sets support, `... and ...?` and collection if and for, just like lists do.

### Runes

- In Dart, runes are the `UTF-32` code points of a string.

- Unicode defines a unique numeric value for each letter, digit, and symbol used in all of the world’s writing systems.

- Because a `Dart string` is a sequence of `UTF-16 code units`, expressing 32-bit Unicode values within a string requires special syntax.

- The usual way to express a Unicode code point is `\uXXXX`, where XXXX is a 4-digit hexadecimal value.
  - For example, the heart character (♥) is \u2665.

- To specify more or less than 4 hex digits, place the value in curly brackets.
  - For example, the laughing emoji (😆) is \u{1f600}.
  ```javascript
  var clapping = '\u{1f44f}';
  print(clapping);
  print(clapping.codeUnits);
  print(clapping.runes.toList());
  Runes input = new Runes(
      '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
  print(new String.fromCharCodes(input));
  ```

### Functions

- Dart is a `true object-oriented` language, so even `functions are objects` and have a type, Function.
This means that functions can be assigned to variables or passed as arguments to other functions.

- You can also call an instance of a Dart class as if it were a function.
  ```javascript
  int fibonacci(int n) {
    if (n == 0 || n == 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  ```

- Using arrow syntax
  ```javascript
  bool isNoble(int atomicNumber) => nobleGases[atomicNumber] != null;
  ```

- A function can have two types of `parameters`: `required and optional`. The required parameters are `listed first`, followed by any optional parameters.

- Named optional parameters can also be marked as `@required`.

#### Optional parameters

- Optional parameters can be either `positional or named`, but not both.

##### Optional named parameters

- When calling a function, you can specify named parameters using `paramName: value`.
  ```javascript
  enableFlags(bold: true, hidden: false);
  ```

- When defining a function, use `{param1, param2, …}` to specify `named parameters`
  ```javascript
  // Sets the [bold] and [hidden] flags ...
  void enableFlags({bool bold, @required bool hidden}) {
  }
  ```

- `@required` annotation is defined in the meta package. `import package:meta/meta.dart` directly.

##### Optional positional parameters

- Wrapping a set of function `parameters in []` marks them as `optional positional` parameters:
  ```javascript
  String say(String from, String msg, [String device]) {
    var result = '$from says $msg';
    if (device != null) {
      result = '$result with a $device';
    }
    return result;
  }
  ```

#### Default parameter values

- Function can use `= to define default values` for both named and positional parameters.

- The `default values must be compile-time constants`. If no default value is provided, the` default value is null`.
  ```javascript
  // Sets the [bold] and [hidden] flags ...
  void enableFlags1({bool bold = false, bool hidden = false}) {}
  ```

### Lexical scope

- Dart is a `lexically scoped` language, which means that the `scope of variables` is `determined statically`.

#### Lexical closures

- A closure is a `function object` that has `access to variables in its lexical scope`, even when the function is used outside of its original scope.

- Functions can close over variables defined in surrounding scopes.
  ```javascript
  // Returns a function that adds [addBy] to the function's argument.
  Function makeAdder(num addBy) {
    return (num i) => addBy + i;
  }
  ```

### Operators

- List of special operators supported in Dart
  - if null: `??`
  - Cascade: `..`
  - Relational and type test: `>=, >, <=, <, as, is, and is!`
  - Divide, returning an integer result: `~/`

- Use the `as operator` to cast an object to a particular type.

- In general, you should use it as a shorthand for an is test on an object following by an expression using that object.
  ```javascript
  if (emp is Person) {  // Type check
   emp.firstName = 'Bob';
  }
  // You can make the code shorter using the as operator:
  (emp as Person).firstName = 'Bob';
  ```

#### Assignment operators

- Assign values using the = operator.
- To assign only if the assigned-to `variable is null`, use the `??=` operator.
  ```
  // Assign value to a
  a = value;
  // Assign value to b if b is null; otherwise, b stays the same
  b ??= value;
  ```

#### Conditional expressions

- Dart has two operators that let you concisely evaluate expressions that might otherwise require if-else statements

- If condition is true, evaluates expr1 (and returns its value); otherwise, evaluates and returns the value of expr2.
  ```
  condition ? expr1 : expr2
  ```

- If expr1 is non-null, returns its value; otherwise, evaluates and returns the value of expr2.
  ```
  expr1 ?? expr2
  ```

- When you need to assign a value based on a boolean expression, consider using `?:`
  ```javascript
  var visibility = isTrue ? 'public' : 'private';
  ```

- If the boolean expression tests for null, consider using `??`
  ```
  String playerName(String name) => name ?? 'Guest';
  ```

#### Cascade notation (..)

- Cascades `..` allow you to make a `sequence of operations` on the same object. In addition to function calls, you can also access fields on that same object.

- This often saves you the step of creating a temporary variable and allows you to write more fluid code.
  ```javascript
  querySelector('#confirm') -  Get an object.
    ..text = 'Confirm' -  Use its members.
    ..classes.add('important')
    ..onClick.listen((e) => window.alert('Confirmed!'));
    ```

- The previous example is equivalent to:
  ```javascript
  var button = querySelector('#confirm');
  button.text = 'Confirm';
  button.classes.add('important');
  button.onClick.listen((e) => window.alert('Confirmed!'));
  ```

- Cascades can be nested. For example:
  ```javascript
  final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
    ```

### Switch and Case

- Switch statements in Dart compare `integer`, `string`, or `compile-time constants` using `==`.

- The compared objects must all be instances of the same class (and not of any of its subtypes), and the class `must not override ==`.

- `Enumerated` types work well in switch statements.

### Exceptions

- All of Dart’s exceptions are `unchecked exceptions`. Dart provides `Exception` and `Error` types, as well as numerous predefined subtypes.
You can, of course, define your own exceptions.

- However, Dart programs can throw any `non-null object`— not just Exception and `Error objects`— as an exception.

- Here’s an example of throwing, or raising, an exception:
  ```javascript
  throw FormatException('Expected at least 1 section');
  // You can also throw arbitrary objects
  throw 'Out of llamas!';
  ```

- Production-quality code usually throws types that implement `Error` or `Exception`.

- To raise an exception, use `throw`
  ```javascript
  if (year == 0) {
    throw StateError('No astronauts.');
  }
  ```

- To catch an exception, use a `try` statement with `on or catch` (or both):
  ```javascript
  void catchException() async {
    try {
      for (var object in arrayData) {
        var description = await File('$object.txt').readAsString();
        print(description);
      }
    } on IOException catch (e) {
      print('Could not describe object: $e');
    } finally {
      arrayData.clear();
    }
  }
  ```

- Catching, or capturing, an exception stops the exception from propagating
  ```javascript
  try {
    breedMoreLlamas();
  } on OutOfLlamasException {
    buyMoreLlamas();
  }
  ```

- To handle code that can `throw more than one type` of exception, you can specify `multiple catch` clauses. The first catch clause that matches the thrown object’s type handles the exception. If the catch clause does not specify a type, that clause can handle any type of thrown object:
  ```javascript
  try {
    breedMoreLlamas();
  } on OutOfLlamasException {
    // A specific exception
    buyMoreLlamas();
  } on Exception catch (e) {
    // Anything else that is an exception
    print('Unknown exception: $e');
  } catch (e) {
    // No specified type, handles all
    print('Something really unknown: $e');
  }
  ```

- Use `catch()` when your exception handler needs the exception object. You can specify `one or two parameters` to `catch()`.
  ```javascript
  try {
    // ···
  } on Exception catch (e) {
    print('Exception details:\n $e');
  } catch (e, s) {
    print('Exception details:\n $e');
    print('Stack trace:\n $s');
  }
  ```

- To partially handle an exception, while allowing it to propagate, use the `rethrow` keyword.
  ```javascript
  void misbehave() {
    try {
      dynamic foo = true;
      print(foo++); // Runtime error
    } catch (e) {
      print('misbehave() partially handled ${e.runtimeType}.');
      rethrow; // Allow callers to see the exception.
    }
  }

  void main() {
    try {
      misbehave();
    } catch (e) {
      print('main() finished handling ${e.runtimeType}.');
    }
  }
  ```

- To ensure that some code runs whether or not an exception is thrown, use a `finally` clause. If no catch clause matches the exception, the exception is propagated after the finally clause runs
  ```javascript
  try {
    breedMoreLlamas();
  } finally {
    // Always clean up, even if an exception is thrown.
    cleanLlamaStalls();
  }
  ```

- The `finally` clause runs after any matching catch clauses
  ```javascript
  try {
    breedMoreLlamas();
  } catch (e) {
    print('Error: $e'); // Handle the exception first.
  } finally {
    cleanLlamaStalls(); // Then clean up.
  }
  ```

### Classes

- Dart is an object-oriented language with classes and` mixin-based inheritance`. Every object is an instance of a class,
and all classes `descend from Object`. Mixin-based inheritance means that although
every class (except for Object) has `exactly one superclass`, a class body can be reused in multiple class hierarchies.


#### Using class members

- Objects have members consisting of `functions` and `data` (methods and instance variables, respectively).
When you call a method, you invoke it on an object: the method has access to that object’s functions and data.

- Use a `dot (.)` to refer to an instance variable or method:
  ```javascript
  var p = Point(2, 2); // Where Point is a class
  // Set the value of the instance variable y.
  p.y = 3;

  // Invoke distanceTo() on p.
  num distance = p.distanceTo(Point(4, 4));
  ```

- Use `?.` instead of . to avoid an `exception when the leftmost operand is null`
  ```
  // If p is non-null, set its y value to 4.
  p?.y = 4;
  ```

#### Using constructors

- You can create an object using a constructor. Constructor names can be either `ClassName` or `ClassName.identifier`.
`new` keyword is optional in `Dart 2`.  
  ```javascript
  var p1 = Point(2, 2);
  var p2 = Point.fromJson({'x': 1, 'y': 2});
  ```

- Some classes provide `constant constructors`. To create a compile-time constant using a `constant` constructor, put the `const` keyword before the constructor name
  ```javascript
  var p = const ImmutablePoint(2, 2);
  ```

- Constructing `two identical compile-time constants` results in a `single, canonical instance`
  ```javascript
  var a = const ImmutablePoint(1, 1);
  var b = const ImmutablePoint(1, 1);
  ```

- Within a constant context, you can `omit the const` before a constructor or literal.
For example, look at this code, which creates a const map
  ```javascript
  // Lots of const keywords here.
  const pointAndLine = const {
    'point': const [const ImmutablePoint(0, 0)],
    'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
  };

  // You can omit all but the first use of the const keyword
  // Only one const, which establishes the constant context.
  const pointAndLine = {
    'point': [ImmutablePoint(0, 0)],
    'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
  };
  ```

- If a constant constructor is outside of a constant context and is `invoked without const`, it creates a `non-constant object`
  ```javascript
  var a = const ImmutablePoint(1, 1); // Creates a constant
  var b = ImmutablePoint(1, 1); // Does NOT create a constant
  ```
#### Getting an object’s type

- To get an object’s type at runtime, you can use Object’s `runtimeType` property, which returns a Type object.
  ```javascript
  print('The type of a is ${a.runtimeType}');
  ```

#### Instance variables

- Here’s how you declare instance variables:
  ```javascript
  class Point {
    num x; // Declare instance variable x, initially null.
    num y; // Declare y, initially null.
    num z = 0; // Declare z, initially 0.
  }
  ```
- All uninitialized instance variables have the value `null`.

- All `instance variables` generate an `implicit getter method`.` Non-final instance variables` also generate an `implicit setter` method.
  ```javascript
  void main() {
    var point = Point();
    point.x = 4; // Use the setter method for x.
    print(point.x); // Use the getter method for x.
    print(point.y); // Values default to null.
  }
  ```

- Initializing an instance variable where it is declared (instead of in a constructor or method), the value is set when the instance is created, which is `before the constructor` and its initializer list execute.

#### Constructors

- Declare a constructor by creating a function with the `same name as its class`. The most common form of constructor, the generative constructor, creates a new instance of a class
  ```javascript
  class Point {
    num x, y;

    Point(num x, num y) {
      // this keyword refers to the current instance.
      this.x = x;
      this.y = y;
    }

    // Syntactic sugar for setting x and y
    // before the constructor body runs.
    Point(this.x, this.y);
  }
  ```

#### Default constructors

- If you don’t declare a constructor, a `default constructor` is provided for you. The default constructor `has no arguments` and invokes the no-argument constructor in the superclass. Constructors aren’t inherited

- `Subclasses don’t inherit` constructors from their `superclass`. A subclass that declares no constructors has only the default (no argument, no name) constructor.

#### Named constructors

- Use a named constructor to implement `multiple constructors` for a class or to provide extra clarity
  ```javascript
  Point.origin() {
    x = 0;
    y = 0;
  }
  ```

- `superclass’s named constructor` is `not inherited` by a `subclass`. If you want a subclass to be created with a named constructor defined in the superclass, you must implement that constructor in the subclass.

#### Invoking a non-default superclass constructor

- By default, a constructor in a subclass calls the `superclass’s unnamed, no-argument constructor`. The superclass’s constructor is called at the beginning of the constructor body. If an initializer list is also being used, it executes before the superclass is called. In summary, the order of execution is as follows:
  - initializer list
  - superclass’s no-arg constructor
  - main class’s no-arg constructor

- If the superclass doesn’t have an unnamed, no-argument constructor, then you must manually call one of the constructors in the superclass. Specify the superclass constructor after `a colon (:)`, just before the constructor body (if any).
  ```javascript
  class Employee extends Person {
    Employee() : super.fromJson(getDefaultData());
  }
  ```

- `Arguments` to the superclass constructor` do not have access` to `this`. For example, arguments `can call static methods` but `not instance methods`.

### Async

- Avoid callback hell and make your code much more readable by using `async` and `await`.
  ```javascript
  const oneSecond = Duration(seconds: 1);
  Future<void> printWithDelay(String message) async {
    await Future.delayed(oneSecond);
    print(message);
  }
  printWithDelay('Async function');
  ```

### Entry Point

- `main()` function accepts optional `List<String>` param

  ```javascript
  void main() {
    print('Dart has $s, which is very handy.');
    print('That deserves all caps ${s.toUpperCase()} is very handy!');

    // Creating map with Map()
    nobleGases1[2] = 'helium';
    nobleGases1[10] = 'neon';
    nobleGases1[18] = 'argon';
    // Use .length to get the number of key-value pairs in the map:

    // Adding elements to the set
    elements.addAll(halogens);
    elements.add('fluorine'); -  removes the duplicate value added to set

    print('Lenght of a set is: ${elements.length}');

    print(nav);
    print(listOfStrings);

    // Runes examples
    var clapping = '\u{1f44f}';
    print(clapping);
    print(clapping.codeUnits);
    print(clapping.runes.toList());

    Runes input = new Runes(
        '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
    print(new String.fromCharCodes(input));

    // using functions
    var result = fibonacci(20);
    print('Fibonacci(20): $result');

    // example of calling  function without the optional parameter:
    assert(say('Bob', 'Howdy') == 'Bob says Howdy');

    // bold will be true; hidden will be false.
    enableFlags1(bold: true);

    // Create a function that adds 2.
    var add2 = makeAdder(2);

    // Create a function that adds 4.
    var add4 = makeAdder(4);

    print('Closure example:');
    print(add2(3));
    print(add4(3));

    // Using loops
    // Closures inside of Dart’s for loops capture the value of the index, avoiding a common pitfall found in JavaScript. For example, consider:
    print('Closures inside dart capture the value of the index: ');
    var callbacks = [];
    for (var i = 0; i < 2; i++) {
      callbacks.add(() => print(i));
    }
    callbacks.forEach((c) => c());

    // The output is 0 and then 1, as expected. In contrast, the example would print 2 and then 2 in JavaScript.
  }
  ```