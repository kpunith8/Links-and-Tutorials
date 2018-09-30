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

## Method references
- There are five types

|Type	|	Example | Lambda Equivalent
|-----|---------|-------------------
| **Static** | `Integer::ParseInt` | `str -> Integer.parseInt(str)`
| **Bounded** | `Instant.now()::isAfter` | `Instant then = Instant.now(); t -> then.isAfter(t)`
| **Unbound** | `String::toLowerCase` | `str -> str.toLowerCase()`
| **Class Constructor** | `TreeMap<K,V>::new` | `() -> new TreeMap<K, V>()`
| **Array Constructor ** | `int[]::new` | `len -> new int[len]`

##
