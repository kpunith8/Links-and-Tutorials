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
- Streams does not hold any data; it pulls the data it processes from a source

- Stream does not modify the data it processes

- Source may be unbounded; not finite and size of the source is not known at built time.

- Stream patterns
	```java
	// empty stream
	Stream.empty();

	// singleton stream
	Stream.of("one");

	// stream with several elements
	Stream.of("one", "two", "three");

	// constant stream
	Stream.generate(() -> "one");

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
	```

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
