# Java Design Patterns
## Creational:

- Different types:
	- Singleton
	- Builder
	- Prototype
	- Factory
	- Abstract factory

### Singleton:
- only one instance created
-	Guarantees controlling a resource
-	Lazily loaded `eg:` `Runtime`, `Logger`, Spring beams, graphic managers
-	Static in nature but not the class, since static classes are not thread safe, private instance and private constructor, no parameter required for construction

#### Simple Singleton:
```java
private static SingletonSample instance = new SingletonSample();

private SingletonSample() {
}

public static SingletonSample getInstance() {
	return instance;
}
```

#### Lazy Loading:
```java
private static SingletonSample instance = null;

private SingletonSample() {
}

public static SingletonSample getInstance() {
	if(instance == null) {
		instance = new SingletonSample();
	}

	return instance;
}
```

#### Thread safe:
```java
private static SingletonSample instance = null;

private SingletonSample() {
}

public static SingletonSample getInstance() {
	if(instance == null) {
		synchronized(SingletonSample.class) {
			if(instance == null) {
				instance = new SingletonSample();
			}
		}
	}

	return instance;
}
```
Can also be synchronized at the getInstance() method by making it synchronized
```java
public static synchronized SingletonSample getInstance() {
}
```
This will make sure every time it's thread safe. To make sure there is no race condition we will use the above approach

- Pitfalls:
	-	Difficult to write unit tests
	- Not thread safe, if not careful
	-	java.util.Calendar is not a singleton but is a prototype


- Comparison with factory:
	-	no interface / interface driven
	-	Returns the same instance / returns multiple instances (multiple constructors)
	-	Hard to unit test / testable

### Builder:
-	Handle complex constructors
-	Large number of parameters
-	Immutable `eg:` `StringBuilder`, `DocumentBuilder`, `Locale.Builder`
- Constructing constructors with diffent params is called a `telescoping constructors`
-	Written with static inner class
-	Negates the need for exposed setters

```java
public class BuilderDemo {

	private final String meat;
	private final String condiments;

	private BuilderDemo(Builder builder) {
		this.meat = builder.meat;
		this.condiments = builder.condiments;
	}

	public String getMeat() {
		return meat;
	}

	public String getCondiments() {
		return condiments;
	}

	private static class Builder {
		private String meat;
		private String condiments;

		public Builder meat(String meat) {
			this.meat = meat;
			return this;
		}

		public Builder condiments(String condiments) {
			this.condiments = condiments;
			return this;
			}

		public BuilderDemo build() {
			return new BuilderDemo(this);
		}
	}
}

// Demo
BuilderDemo.Builder builder = new BuilderDemo.Builder();
BuilderDemo obj = builder.meat("meat").condiments("condiments").build();
obj.getMeat(); // will return meat
// or
BuilderDemo object = new BuilderDemo.Builder().meat("meat").condiments("condiments").build();
```

### Prototype
-	To get the unique instance of the same object
-	Avoids costly creation
-	Avoids subclassing
-	Typically don't use keyword new
-	Utilizes interfaces
`eg:` `clone()` method on `Object`
-	Implements `Clone/Clonable` interface
-	Each instance is unique

- pitfalls:
	-	Sometimes not clear when to use
	-	Used with other pattern; when pattern contains other pattern it's called a framework

### Factory
-	Doesn't expose instantiation logic
-	Defers instantiation to subclass
-	It exposes common interface
`eg:` `Calendar`, `ResourceBundle`, `NumberFormat`

```java
public abstract class Website {
	protected List<Page> pages = new ArrayList<>();

	// Add getter to pages

	public Website() {
		this.createWebsite();
	}

	public abstract void createWebsite(); // Factory method
	}

	public class Blog extends Website {
		@override
		public void createWebsite() {
			pages.add(new PostPage());
			pages.add(new AboutPage());
		}
	}

// Factory class
public class WebsiteFactory {

	public static Website getWebsite(String siteType) {
		switch(siteType) {
			case "blog":
				return new Blog();
				break;

			case "shop":
				return new Shop(); // Shop extending website abstract class
			break;

			default:
				return null;
				break;
		}
	}
}

// Demo
public class Demo {
	psvm() {
		Website site = WebsiteFactory.getWebsite("blog");
		sysout(site.getPages());
	}
}
```

### Abstact Factory Pattern:
-	Factory of factories
-	Factory of releated objects
- Common interface, and deferring the instantiation to subclass
`eg:` `DocumentBuilder`, `frameworks`
-	Composition used

# Java-The-Complete-Reference-9th-Edition:
## Enum

- An enumeration can have constructors, methods, and instance variables. `eg:`
	```java
	enum User {
		ADMIN, NORMAL, GROUP
	}
	```

- The identifiers `ADMIN`, `NORMAL` are called enumeration constants.

- Each is implicitly declared as a public, static final member of User.

- These constants are self-typed.

- Once you have defined an enumeration, you can create a variable of that type.

-  Even though enumerations define a class type. Do not instantiate an enum using `new`. Instead, you declare and use an enumeration variable in much the same way as you do one of the primitive types. `eg:`
	```java
	User admin = User.ADMIN;
	```

- Two enumeration constants `can be compared for equality` by using the `==` relational operator. `eg:`
	```java
	if (admin == User.ADMIN)
	```

- An enumeration value can also be used to control a `switch` statement. `eg:`
	```java
	switch(User) {
		case ADMIN: break;
		case GROUP: break;
	}
	```

- All enumerations automatically contain two predefined methods: `values()` and `valueOf()`. Their general forms are shown here:
	```java
	public static enum-type [] values();
	public static enum-type valueOf(String str);
	```
	```java
	User.valueOf("ADMIN"); // returns ADMIN
	User allUsers[] = User.values(); // returns all the values of User as an array
	```

-	When you define a constructor for an enum, the constructor is called when each enumeration constant is created.`eg:`
	```java
	enum Apple {
		Jonathan(10), GoldenDel(9), RedDel(12), Winesap(15),Cortland(8);

		private int price; // price of each apple

		// Constructor
		Apple(int price) {
			price = price;
		}

		int getPrice() {
			return price;
		}
	}
	```

- Here are `two` restrictions that apply to enumerations:
	- An enumeration `cannot inherit another class`
	- An enum `cannot be a superclass`. This means that an enum can’t be extended.

- Obtain a value that indicates an enumeration constant’s position in the list of constants using `ordinal()` method.

## Type Wrappers: Object representation of primitive data types

- The type wrappers are Double, Float, Long, Integer, Short, Byte, Character, and Boolean.
- Character can be created using,
	```java
	Character(char ch);
	char charValue() // returns the char contained in it.
	```

- Boolean can be created using
	```java
	Boolean(boolean boolValue);
	Boolean(String boolString); // TRUE or true as a string
	```
	```java
	boolean booleanValue(); // returns the boolean value containg it.
	```

- `Byte`, `Short`, `Integer`, `Long`, `Float`, and `Double`. All of the numeric type wrappers inherit the abstract class `Number`.
	```java
	Integer(int num);
	Integer(String str); // If `str` does not contain a valid numeric value, then a NumberFormatException is thrown.
	```

- All of the type wrappers override `toString()`. It returns the human-readable form of the
value contained within the wrapper.

- The process of encapsulating a value within an object is called `boxing`. `eg:`
	```java
	Integer integer = new Integer(100);
	```

- The process of extracting a value from a type wrapper is called `unboxing`. `eg:`
	```java
	int ii = i.intValue();
	```

- JDK-5 introduced `auto-boxing` and `auto-unboxing` to avoid boxing and unboxing manually.

	- `Auto-boxing`, no longer necessary to manually construct an object in order to wrap a primitive type. `eg:`
	```java
	Integer iOb = 100; // autobox an int
	```

	- `Auto-unboxing` is the process by which the value of a
	boxed object is automatically extracted (unboxed) from a type wrapper when its value is needed. There is no need to call a method such as `intValue()` or` doubleValue()`. `eg:`
	```java
	int i = iOb; // auto-unboxing
	Integer iOb, iOb2;
	```

	- Autoboxing and auto-unboxing in expressions:
	```java
	int i;
	iOb = 100;

	System.out.println("Original value of iOb: " + iOb);

	// The following automatically unboxes iOb,
	// performs the increment, and then reboxes
	// the result back into iOb.
	++iOb;
	System.out.println("After ++iOb: " + iOb);

	// Here, iOb is unboxed, the expression is
	// evaluated, and the result is reboxed and
	// assigned to iOb2.
	iOb2 = iOb + (iOb / 3);

	System.out.println("iOb2 after expression: " + iOb2);
	// The same expression is evaluated, but the
	// result is not reboxed.
	i = iOb + (iOb / 3);
	```

## Annotations (Metadata)

- To add supplemental information to source file, it does not change the actions of an program.

- Annotation is created based on interface `eg:`
	```java
	@interface MyAnnotation {
		String str();
		int val();
	}
	```
	```java
	// Annotate a method.
	@MyAnno(str = "Annotation Example", val = 100)
		public static void myMethod() {
	}
	```

- An annotation cannot include an `extends` clause. However, all annotation types automatically extend the Annotation interface.

- `classes`, `methods`, `fields`, `parameters`, and `enum` constants can be annotated in `JDK 8`.

- A retention policy determines at what point an annotation is discarded. Java defines three
such policies, which are encapsulated within the `java.lang.annotation.RetentionPolicy` enumeration. They are `SOURCE`, `CLASS`, and `RUNTIME`.

- An annotation with a retention policy of SOURCE is retained only in the source file and is discarded during compilation.

- An annotation with a retention policy of `CLASS` is stored in the `.class` file during compilation. However, it is not available through the JVM during run time.

- An annotation with a retention policy of `RUNTIME` is stored in the `.class` file during compilation and is available through the JVM during run time. Thus, `RUNTIME` retention offers the greatest annotation persistence.
> NOTE: An annotation on a local variable declaration is not retained in the `.class` file.

- Default is CLASS retention policy, if nothing specified
```java
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnno {
	String str();
	int val();
}
```

- `Reflection` is the feature that enables information about a class to be obtained at run time.

- The methods `getAnnotation()` and `getAnnotations()` are defined by the `AnnotatedElement` interface, which is defined in `java.lang.reflect` package. This interface supports reflection for annotations and is implemented by the classes `Method`,
`Field`, `Constructor`, `Class`, and `Package`, among others.

- In addition to `getAnnotation()` and `getAnnotations()`, `AnnotatedElement` defines several other methods.

	Two have been available since JDK 5.
	 - `Annotation[] getDeclaredAnnotations()` It returns all non-inherited annotations present in the invoking object.

	 - `isAnnotationPresent()`, which has this general form:
		`boolean isAnnotationPresent(Class<? extends Annotation>   annoType)` It returns true if the annotation specified by annoType is associated with the invoking object, returns false otherwise.

	 - And `JDK 8` adds,
		`getDeclaredAnnotation()`, `getAnnotationsByType()`, and `getDeclaredAnnotationsByType()`. Of these, the last two
		automatically work with a repeated annotation.

- Default values: annotation members can have default values that will be used if no value is specified when the annotation is applied. `eg:`
```java
// An annotation type declaration that includes defaults.
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnno {
	String str() default "Testing";
	int val() default 9000;
}
```

- A marker annotation is a special kind of annotation that contains no members. `eg:`
```java
// A marker annotation.
@Retention(RetentionPolicy.RUNTIME)
@interface MyMarker { }
```

- The best way to determine if a marker annotation is present is to use the method `isAnnotationPresent()`.
```java
Method m = ob.getClass().getMethod("myMeth");
if(m.isAnnotationPresent(MyMarker.class))
```
- A single-member annotation contains only one member.
```java
@Retention(RetentionPolicy.RUNTIME)
@interface MySingle {
	int value(); // this variable name must be value
}
```
```java
class Single {
	// Annotate a method using a single-member annotation.
	@MySingle(100)
	public static void myMeth() {
	}
}
```

- The Built-In Annotations:

- Java defines many built-in annotations. Most are specialized, but nine are general purpose.
- `Four` are from `java.lang.annotation`: `@Retention`, `@Documented(marker)`, `@Target`, and `@Inherited`.

- `Five` are from `java.lang`:` @Override`, `@Deprecated`, `@FunctionalInterface`, `@SafeVarargs`, and `@SuppressWarnings` (All are marker annotations except `@SuppressWarnings`)

- `@Target({ ElementType.FIELD, ElementType.LOCAL_VARIABLE })`
`ElementType` specifies the types of declarations to which the annotation can be applied. Possible types are:
		- ANNOTATION_TYPE - Another annotation
		- CONSTRUCTOR - Constructor
		- FIELD - Field
		- LOCAL_VARIABLE - Local variable
		- METHOD - Method
		- PACKAGE - Package
		- PARAMETER Parameter
		- TYPE - Class, interface, or enumeration
		- TYPE_PARAMETER - Type parameter (Added in `JDK 8`)
		- TYPE_USE - Type use (Added in `JDK 8`)

> NOTE: JDK 8 adds the annotations `Repeatable` and `Native` to `java.lang.annotation`. Repeatable supports repeatable annotations, Native annotates a field that can be accessed by native code.

## Generics

- Generics means parameterized types, and are type safe. With generics, all casts are automatic	and implicit.

- When declaring an instance of a generic type, the type argument passed to the type
parameter must be a reference type. You cannot use a primitive type, such as int or char.

- Bounded Types: Limits the types that can be passed to a type parameter.

- When specifying a type parameter, you can create an upper bound that declares the superclass from which all type arguments
must be derived. This is accomplished through the use of an extends clause when specifying
the type parameter, as shown here: <T extends superclass>

- When specifying a bound that has a class and an interface, or multiple interfaces, use the & operator to connect them.
`eg:`
```java
class Gen<T extends MyClass & MyInterface> {
}
```

- In this case, the class type must be specified first

- The wildcard argument is specified by the ?, and it represents an unknown type.
`boolean sameAvg(Stats<?> ob)` - here Stats<?> matches any Stats objects.

	- Bounded Wildcards:

		- Wildcard arguments can be bounded in much the same way that a type parameter can be
		bounded. A bounded wildcard is especially important when you are creating a generic type
		that will operate on a class hierarchy.

		`Coords<? extends ThreeD>`

		- specify a lower bound for a wildcard by adding a super clause to a wildcard
		declaration. Here is its general form:
		`<? super subclass>`

	- Generic Method:

		- The type parameters are declared before the return type of the method
		`eg:`
		```java
		static <T extends Comparable<T>, V extends T> boolean isIn(T x, V[] y) {
		}
		```
	- Generic Constructors:

		- It is possible for constructors to be generic, even if their class is not.
		`eg:`
		```java
		class GenCons {
			private double val;

			<T extends Number> GenCons(T arg) {
				val = arg.doubleValue();
			}

			void showval() {
				System.out.println("val: " + val);
			}
		}
		```

	- Generic Interfaces: `eg:`
		```java
		interface MinMax<T extends Comparable<T>>
		{
			T min();
			T max();
		}
		```
		```java
		class MyClass<T extends Comparable<T>> implements MinMax<T>
		{
			T[] vals;

			MyClass(T[] o)
			{
				vals = o;
			}

			// Return the minimum value in vals.
			public T min() {
				T v = vals[0];

				for(int i=1; i < vals.length; i++) {
					if(vals[i].compareTo(v) < 0) v = vals[i];
						return v;
				}
			}

			// Return the maximum value in vals.
			public T max() {
				T v = vals[0];
				for(int i=1; i < vals.length; i++) {
					if(vals[i].compareTo(v) > 0) v = vals[i];
						return v;
				}
			}
	}
	```
	
## Java Basics - https://docs.oracle.com/javase/tutorial/java/javaOO/

### Local Classes

- You can define a local class in a `method body`, a `for` loop, or an `if` clause.

- A local class has access to the members of its enclosing class.

- Starting in `Java-8`, a local class can `access local variables` and `parameters of the enclosing block`
	that are `final` or effectively final. 

- `Local classes` are similar to `inner classes` because they `cannot define or declare any static members`.
	Local classes are `non-static` because they have access to instance members of the enclosing block

- You cannot declare an `interface` inside a block; interfaces are `inherently static`.
	```java
	// This code won't compile
	public void greetInEnglish() {
        interface HelloThere {
           public void greet();
        }
        class EnglishHelloThere implements HelloThere {
            public void greet() {
                System.out.println("Hello " + name);
            }
        }
        HelloThere myGreeting = new EnglishHelloThere();
        myGreeting.greet();
   }
	```

- You cannot `declare static initializers` or `member interfaces` in a local class
	```java
	// This code won't compile
	public void sayGoodbyeInEnglish() {
        class EnglishGoodbye {
            public static void sayGoodbye() {
                System.out.println("Bye bye");
            }
        }
        EnglishGoodbye.sayGoodbye();
   }
	```
	
- A local class can have `static members` provided that they are `constant variables`. A constant variable 
	is a variable of `primitive type` or type `String` that is declared `final` and initialized with a 
	compile-time constant expression. A compile-time constant expression is typically a string or 
	an arithmetic expression that can be evaluated at compile time.
	```java 
	// This code compiles
	public void sayGoodbyeInEnglish() {
        class EnglishGoodbye {
            public static final String farewell = "Bye bye";
            public void sayGoodbye() {
                System.out.println(farewell);
            }
        }
        EnglishGoodbye myEnglishGoodbye = new EnglishGoodbye();
        myEnglishGoodbye.sayGoodbye();
  }
	```

### Annonymous Classes

- 

	
### Threads and Concurrency

- Use `synchronize` keyword to avoid the `race-condtion` from two threads accessing the same variable or data, 
	it creates the lock, so that only one can hold the lock to access the data, once lock released other thread can 
	access the same variable or data.

- Using `synchronize` keyword on a method declaration uses `implicit lock object` i.e class object in case of 
	`static method` or `instance lock object` in case of a non-static method.

- Locks are `reentrant` when a thread holds a lock, it can enter a block synchronized on the lock it is holding.

- A `Thread` is started in Java by calling the `start()` method of `java.lang.Thread`.

- Direct call to the `run()` executed in the same thread which calls the `run()` method. 
	JVM will not create a new thread until you call the `start()` method.
	
- When you call the `Thread.start()` method, then the code inside `run()` method 
	will be executed on a new thread, which is actually created by the start() method.
	
- You can call the `run()` multiple times, JVM will not throw any error, but you cannot call the `start()` method 
	on same thread instance.
	
- One of the key difference between `wait()` and `sleep()` method is that, 
	`Thread.sleep()` puts the current thread on wait but doesn't release any lock it is holding, 
	but `wait()` releases the lock it holds before going into blocking state.
	
- A thread can be stopped using `interrupt()` method on a thread, The code of task should call `isInterrupted()` 
	to termicate itself.
	```java
	Runnable task = () -> {
		while(!Thread.currentThread().isInterrupted()) {
			...continue the task
		}
	}
	
	Thread thread = new Thread(task);
	task.interrupt();
	```
	
#### Producer/Consumer Pattern

- A producer produces values in buffer, a consumer consumes the values from the buffer.

- The buffer can be full or empty.

- Both producer and consumers runs in thier own Thread.

- `wait()` and `notify()` methods are used to solve this problem

- The thread executing the invocation should hold the the key of the object.

- `wait()` and `notify()` cannot be outside a synchronized block.

- Calling `wait()` releases the key held by this thread, and puts thread in a `WAIT` state
	then `notify()` cab be called to release a thread, puts the thread from `WAIT` to `RUNNABLE` state.
	`notiftAll()` is used to notify all the threads which are in waiting state.

#### Ordering reading and write operations in multicore CPU

- A `happens-before` link exists between `all synchronized` or `volatile` `write` operations and `all synchronized`
	or `volatile` `read` operations that follw.
	
- `Synchonization` guarantees the `exclusive execution` of a block of code.

- `Visibiity` guarantees the `consistency of the variables`.

- All shared varibles should be accessed in a synchronized or in a volatile way.

- `False Sharing` happens because of the way CPU caches work, the cache is organized in lines of data,
	Each line can hold 8 longs (64 bytes), when a visible variable is modified in L1 cache, all the 
	line is marked as `dirty` for the other caches. A read on a dirty line triggers a refresh on the data line.

- 
