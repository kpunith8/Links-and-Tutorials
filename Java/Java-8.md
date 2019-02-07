# Java 8

## Lambdas

- Lambdas require functional interfaces.

- Lambdas cannot access themselves; `this` refers to enclosing instance.

- If lambda is long or complex, extract it to method and use method references;

- Prefer expression lambdas over block lambdas.
	```java
	// prefered
	str -> str.toUpperCase(Locale.US);

	// Use with care
	str -> {
		return str.toUpperCase(Locale.US);
	}
	```
	
## Functional Interfaces

- An interface with only one abstract method

- Methods from `Object` do not count

- May be annotated with `@FunctionalInterface`, but optional

- Built in functional interfaces, there are four categories:

	- `Consumer<T>` - consumes an object, and doesn't return anything, has `accept(T t)` method
	and `BiConsumer<T, V>` does the same with 2 parameters `eg:`
	```java
	// Using lambdas
	Consumer<String> consumer = str -> System.out.println(str);
	// Using method references
	Consumer<String> consumer = System.out::println;
	```

	- `Supplier<T>` - Provides an object, takes no parameter, has `T get()` method; `eg:`
	```java
	// Using lambdas
	Supplier<Person> personSupplier = () -> new Person();
	// Using method references
	Supplier<Person> personSupplier = Person::new;
	```

	- `Function<T, R>` - Takes an object of type T and returns an object of type R, has `R apply(T t)` method
	and `BiFunction<T, V, R>` has `R apply(T t, V v)` method;
	and has `UnaryOpeator<T> and BinaryOperator<T>` extending `Function<T> and BiFunction<T, T, T>` respectively. `eg:`
	```java
	// Using lambdas
	Function<Person, String> ageFunction = person -> person.getAge();
	// Using method references
	Function<Person, String> ageFunction = Person::getAge;
	```

	- `Predicate<T>` - Takes an object and returns a boolean, has `boolean test(T t)` method  and `BiPredicate<T, U>`, has
	`boolean test(T t, U u)` method; `eg:`
	```java
	// Using lambdas
	Predicate<Person> ageGT20 = person -> person.getAge() > 20;
	```

	- Functional interfaces for primitive types; refer `java.util.Function` package `eg:`
		- IntPredicate
		- IntFunction
		- IntToDoubleFunction

## Data processing using Lambdas and the Collection framework
- New methods to Collection API
	```java
	// on Iterable
	boolean forEach(Consumer<? super E> consumer);
	// on Collection
	boolean removeIf(Predicate<? super E> filter);

	List<Person> people = ...;
	// Prints all the items in people list
	people.forEach(System.out::println);

	// Remove the item from the collection
	people.removeIf(person -> person.getAge() > 20);

	// on List
	boolean replaceAll(UnaryOpeator<? super E> operator);
	boolean sort(Comparator<? super E> comparator);

	people.replaceAll(person -> person.getName().toUpperCase());
	// Need to import static java.util.stream.Collectors.*;
	people.sort(Comparator.comparing(Person::getName).thenComparing(person::getAge));

	// Map Interface
	void forEach(BiConsumer<? super K, ? super V> consumer);

	// To get the number of people in a city
	Map<City, List<People>> cityPeopleMap = ...;
	map.forEach((city, people) -> System.out.println(city + " has " + people.size() + " people"));

	// Map's new get() method
	V getOrDefault(Object key, V defaultValue);

	// Return a values if given city present or returns default value passed to it, in this case it is an empty list
	map.getOrDefault(boston, emptyList());

	// Map's new put()
	V putIfPresent(K key, V value);

	// Map's new replace() method
	V replace(K key, V newValue);
	boolean replace(K key, V existingValue, V newValue);

	void replaceAll(BiFunction<? super K, ? super V, ? extends V> function);

	// Map's new remove() method
	void remove(Object key, Object value);

	// Map's merge() method
	V merge(K key, V newValue, BiFunction<? super K, ? super V, ? extends V> remapping);

	// Merge the people live in a particular city with map2
	Map<City, List<People>> map1 = ...;
	Map<City, List<People>> map1 = ...;

	map2.forEach((key, value) -> {
			 map1.merge(key, value, (existingPeople, newPlople) -> { 		     
				 	existingPeople.addAll(newPlople);
					return existingPeople;
			});
		});
	```

## Method references
- There are five types

|Type	|	Example | Lambda Equivalent
|-----|---------|-------------------
| **Static** | `Integer::ParseInt` | `str -> Integer.parseInt(str)`
| **Bounded** | `Instant.now()::isAfter` | `Instant then = Instant.now(); t -> then.isAfter(t)`
| **Unbound** | `String::toLowerCase` | `str -> str.toLowerCase()`
| **Class Constructor** | `TreeMap<K,V>::new` | `() -> new TreeMap<K, V>()`
| **Array Constructor ** | `int[]::new` | `len -> new int[len]`

## Streams

- Stream is a sequence of elements from a source that supports aggregate operations.

	- Sequence of elements: A stream provides an interface to a sequenced set of values of a specific element type.
	However, streams don’t actually store elements; they are computed on demand.

	- Source: Streams consume from a data-providing source such as collections, arrays, or I/O resources.

	- Aggregate operations: Streams support SQL-like operations and common operations from functional programing languages, such as `filter`, `map`, `reduce`, `find`, `match`, `sorted`, and so on.

- Stream operations have two fundamental characteristics that make them very different from collection operations:

	- Pipelining: Many stream operations return a stream themselves. This allows operations to be chained to form a larger pipeline.
	This enables certain optimizations, such as `laziness` and `short-circuiting`.

	- Internal iteration: In contrast to collections, which are iterated explicitly (external iteration),
	stream operations do the iteration behind the scenes for you.

- Stream lets you process data in a declarative way. Furthermore, streams can leverage multi-core architectures without you having to write a single line of multithread code.

- Streams does not hold any data; it pulls the data it processes from a source

- Stream does not modify the data it processes

- Source may be unbounded; not finite and size of the source is not known at built time.

- Once the instance created, the instance `will not modify its source`, therefore allowing the `creation of multiple instances` from a single
 source.
	```java
	// empty stream
	Stream.empty();

	// singleton stream
	Stream.of("one");

	// stream with several elements
	Stream.of("one", "two", "three");

	// constant stream
	Stream.generate(() -> "one").limit(10);

	// growing stream
	Stream.iterate("+", s -> s + , "+");

	// Integer stream from a string
	IntStream stream = "hello".chars();

	// Stream on regular expression
	Stream<Sting> words = Pattern.compile("^\\p{java}").splitAsStream(book);

	// Stream on the lines of a text file
	Stream<String> lines = Files.lines(path);

	// Stream Builder pattern
	Stream.Builder<String> builder = Stream.builder();
	// add() allows chaining
	builder.add("one").add("two").add("three");
	// accept() doesn't return anything and cannot be chained
	builder.accept("one");
	Stream<String> stream = builder.build();

	// Stream of arrays
	String[] arr = new String[]{"a", "b", "c"};
	Stream<String> streamOfArrayFull = Arrays.stream(arr);
	Stream<String> streamOfArrayPart = Arrays.stream(arr, 1, 3);
	```

### Types of Streams

- `IntStream`, `DoubleStream`, and `LongStream` - used to avoid auto boxing and un boxing
- Stream can be converted to any primitive streams using `mapToInt(ToIntFunction<T>)`, `mapToLong(ToLongFunction<T>)`,
	and `mapToDouble(ToDoubleFunction<T>)`

### Stream methods
- `map()` call can change the type of the stream.

- `filter()` call doesn't change the type of the stream.

- `peek(System.out::println)` can be invoked on `map()` to display the items, using `forEach()` on `map()` doesn't return stream.

- `forEach()` is terminal operation and should be called at the end, and it doesn't return any stream.

- `peak()` can be used for logging purposes, don't use it in production, and it is an intermediate operation, calling at the end of stream will not print anything. `eg:`
 	```java
	person.stream()
		  	.map(p -> p.getAge())
				.peek(System.out::println)
				.filter(age -> age > 20)
				.peek(System.out::println); // It should always be terminal call to process the data of a stream
	```

- If a call returns Stream then it is an `intermediate call` or if it returns void or something else then it is a `terminal call`.

- `collect(toList())` static method from the `java.util.stream.Collectors` can be used to return a list from processed stream.

> NOTE: if no terminal operation - no data is processed from a stream and no data is returned

## Parallel Streams

- Stateful streams will not be computed efficiently in parallel, should avoid using parallel stream for ex: using `skip(2)` or `limit(5)` on
	a stream

- Stateless stream - No outside information is needed to compute anything

- Making a list unordered will increase the performance on parallel stream

- Controlling the number of cores used by parallel streams
	```java
	// Uses only 2 cores, by default fork/join used by parallel stream uses all available CPU cores in the system
	System.setProperty("java.util.concurrent.ForkJoinPool.common.parallelism", "2");
	```

### Selecting ranges of data in a stream
- `skip()` and `filter()`
	```java
	person.stream()
				.skip(2)
				.limit(3)
				.filter(age -> age > 20)
				.forEach(System.out::println);
	```

### Simple reductions
- Match reduction: `anyMatch(), allMatch(), and noneMatch(),`
	```java
	// allMatch() returns true if all the elements matches the predicate
	// noneMatch() returns true if no elements matches the predicate
	people.stream()
				.anyMatch(p -> p.getAge() > 20); // returns true if any of the element matches the predicate
	```

- These three matchers may not evaluate the predicate on all the elements, hence they are called 'Short-Circuiting' terminal operations

- Find Reduction: `findFirst() and findAny()`
	```java
	// Optional is returned because it may not return result because of empty stream of predicate cannot match
	// findAny() returns any person matching the predicate
	Optional<Person> opt = people.stream().findFirst(p -> p.getAge() > 20);
	```

- Reduce reduction: has 3 types
	```java
	// Using the identity, here 0 is the identity element of the max reduction
	people.stream()
				.reduce(0, (p1, p2) -> Integer.max(p1.getAge(), p2.getAge()));

	// No identity element is provided, so that the result it wrapped in Optional
	Optional<Integer> optionalAges = people.stream().reduce((p1, p2) -> Integer.max(p1.getAge(), p2.getAge()));

	// Used in parallel operations
	people.stream()
				.reduce(
					new ArrayList<Integer>(),
					(list, p) -> { list.add(p.getAge()); return list; },
					(list1, list2) -> { list1.addAll(list2); return list1; }
				);
	```

- Let’s say we need to find all transactions of type grocery and return a list of transaction IDs sorted in decreasing order of transaction value.
- In Java-7, we’d do that as shown.
	```java
	List<Transaction> groceryTransactions = new Arraylist<>();
	for(Transaction t: transactions){
	  if(t.getType() == Transaction.GROCERY){
	    groceryTransactions.add(t);
	  }
	}
	Collections.sort(groceryTransactions, new Comparator(){
	  public int compare(Transaction t1, Transaction t2){
	    return t2.getValue().compareTo(t1.getValue());
	  }
	});
	List<Integer> transactionIds = new ArrayList<>();
	for(Transaction t : groceryTransactions){
	  transactionsIds.add(t.getId());
	}
	```

- In Java-8, we’d do it as shown.
	```java
	List<Integer> transactionsIds =
	    transactions.stream()
	                .filter(t -> t.getType() == Transaction.GROCERY)
	                .sorted(comparing(Transaction::getValue).reversed())
	                .map(Transaction::getId)
	                .collect(toList());
	```

### Advanced Streams:

-	Spliterator: The object on which a Stream is built. Main stream API built on top of Spliterator interface

- ArrayList and HashSet have different spliterators.

- `flatMap()` flattens the stream of streams
	```java
	// Where s1, s2, and s3 are Stream<String> type
	Stream<Stream<String>> streamOfStreams = Stream.of(s1, s2, s3);

	// Flatten the stream of stream using flatMap
	Stream<String> stream = Stream.of(s1, s2, s3).flatMap(Function.identity());

	// Function to spilt lines into words
	Function<String, Stream<String>> splitIntoWords = line -> Pattern.compile(" ").splitAsStream(line);

	// or
	Function<String, Stream<String>> splitIntoWords = line -> Stream.of(line.split(" "));

	// Pass this function to flatMap as,
	Stream<String> wordsStream = Stream.of(s1, s2, s3) // stream of streams of lines
		.flatMap(Function.identity()) // stream of lines
		.flatMap(splitIntoWords); // stream of words

	// Collect it to set
	Set<String> words = wordsStream.collect(Collectors.toSet());
	```

### State of a stream

- It could be in any one of the state, Ordered, Distinct, Sorted, Sized, Non Null, Immutable, Concurrent, and Sub sized

### Optionals

-	Used as special type of stream which would hold one or zero element

- Optional wraps that may not exist, which can be empty
	```java
	// pattern-1
	Optional<Person> opt = ...;
	
	if(opt.isPresent()) {
		Person p = opt.get();
	} else {
		// Handle errors
	}
	
	// pattern-2
	Person p1 = opt.orElse(Person.getDefault());
	
	// pattern-3
	Person p2 = opt.orElseGet(() -> Person.getDefault());
	
	Optional<String> empty = Optional.empty();
	
	// throws NPE if null passed
	Optional<String> nonEmpty = Optional.of(s); 
	
	// returns empty if null is passed
	Optional<String> couldBeEmpty = Optional.ofNullable(s); 
	```

- example
	```java 
	public static Optional<Double> sqrt(Double d) {
		return d > 0d ? Optional.of(Math.sqrt(d)) : Optional.empty();
	}
	
	doubles.stream().forEach(d -> NewMath.sqrt(d)).ifPresent(result::add);
	```

### Collectors 


### Other Java features

- To get number of processors `Runtime.getRuntime().availableProcessors()`

- To make use of `ARM` - `Automatic Resource Management`, JDK 7 introduced `try with resource`
	class should implement `AutoCloseable` to make sure it can be used as follows
	```
	// It doesn't require finally block to be added
	try(Resource resource = new Resource())
	{
		// Logic
	}
	```

- `ForkJoinPool` for concurrent execution, part of concurrent package
	```java
	List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
	Stream<Integer> stream = numbers.parallelStream().map(e -> e + 1);

	// Creates 100 threads
	ForkJoinPool pool = ForkJoinPool(100);

	// stream runs parallelly because terminal operation is in a pool
	pool.submit(() -> stream.forEach(e -> {}));
	pool.shutdown();
	pool.awaitTermination(10, TimeUnit.SECONDS);
	```

## References:
- https://www.oracle.com/technetwork/articles/java/ma14-java-se-8-streams-2177646.html
- https://www.oracle.com/technetwork/articles/java/architect-streams-pt2-2227132.html
