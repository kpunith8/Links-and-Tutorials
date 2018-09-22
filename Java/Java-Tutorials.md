# Java Design Patterns
## Creational:

Different types:
- Singleton
- Builder
- Prototype
- Factory
- Abstract factory

### Singleton:
- only one instance created
-	Gurantees controlling a resource
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
this will make sure every time it's thread safe. To make sure there is no race condition we will use the above approach

* Pitfalls:
	-	Difficult to write unit tests
	- Not thread safe, if not carefull
	-	java.util.Calendar is not a singleton but is a prototype


* Comparision with factory:
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

### Prototype:
-	To get the unique instance of the same object
-	Avoids costly creation
-	Avoids subclassing
-	Typically don't use keyword new
-	Utilizes interfaces
`eg:` `clone()` method on `Object`
-	Implements Clone/Clonable interface
-	Each instance is unique

* pitfalls:
	-	Sometimes not clear when to use
	-	Used with other pattern; when pattern contains other pattern it's called a framework

### Factory:
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

# Java-The-Complete-Reference-9th-Edition: Find the samples in local eclipse workspace:

## Enum:

- An enumeration can have constructors, methods, and instance variables. `eg:`
```java
enum User {
	ADMIN, NORMAL, GROUP
}
```

- The identifiers ADMIN, NORMAL are called enumeration constants.
- Each is implicitly declared as a public, static final member of User.
- These constants are self-typed.
- Once you have defined an enumeration, you can create a variable of that type.
-  Even though enumerations define a class type. Do not instantiate an enum using `new`. Instead, you declare and use an enumeration variable in much the same way as you do one
of the primitive types.
`eg:`
```java
User admin = User.ADMIN;
```
- Two enumeration constants `can be compared for equality` by using the `==` relational operator.
`eg:`
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
- All enumerations automatically contain two predefined methods: `values()` and `valueOf()`.
Their general forms are shown here:
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
Integer(String str);
```
If `str` does not contain a valid numeric value, then a `NumberFormatException` is thrown.

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

## Annotations (Metadata):

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

- Default is CLASS rentention policy, if nothing specified
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

## Generics:

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
		  ```

# Rest Services using JAX-RS: `Koushik` - `Java Brain`

- Use `@Context UriInfo` and` @Context HtppHeaders` to get additions info of the query params.

- Use `@BeanParam` to get all param in single class, instead of using,

```java
@GET
public List<Message> getMessages(@QueryParam("year") int year, @QueryParam("start") int start,
@QueryParam("size") int size)
{
}
```

-	Create a class to assign these params as follows,
```java
class FilterBean
{
	private @QueryParam("year") int year;
	private @QueryParam("start") int start;
	private @QueryParam("size") int size;
	// Write getters and setters for each query params
}
```

- Replace the above call as follows,

```java
@GET
public List<Message> getMessages(@BeanParam FilterBean filterBean)
{
	// access them using
	filterBean.getYear();
}
```

# Unit Testing Java:

## JUnit:
- Throwing an exception

```java
// Code throwing IllegalArgumentException with an message
throw new IllegalArgumentException(String.format("Cannot find corresponding enum entry for %d", flag));

// unit test for the above code
@Rule
public ExpectedException thrown = ExpectedException.none();

@Test
public void testThrowsIllegalStateException_valueNotFound_HigherBound()
{
	thrown.expect(IllegalArgumentException.class);
	thrown.expectMessage("Cannot find corresponding enum entry for 3");

	someClass.getValue(3);
}
```

## Mockito:

- If you are using annotations to mock a class, make sure it is initialized in a method with JUnit4's `@Before` annotation, since
annotations don't initialize themselves, for ex: In this case it is initialized in a `setUp()`

```java
@Before
public void setUp()
{
	MockitoAnnotations.initMocks(this);
}
```

- It can also be done using '@Rule' annotation on MockitoRule for ex:

```java
@Rule
public  MockitoRule mockitoRule = MockitoJUnit.rule();
@Mock
private WebService mockWebService;
```

- Mocks also can be created using mock() static method as follows
```java
private WebService mockWebService = mock(WebService.class);
```

### Verifying interactions with mockito: To verify methods with void return type

```java
@Test
public void testLogoutOfAnUser() {
	User user = new User(mockWebService, USER_ID, PASSWORD);
	user.logout();

	verify(mockWebService).logout(); // By default verify defaults second parameter to times(1) if not specified

	// If you have a parameter to be passed, pass it as follows,
	user.login(USER_ID, PASSWORD);
	verify(mockWebService, times(1)).login(USER_ID, PASSWORD);
}
```

- It can also be verified to check the number of times it is called, use, `verify(mockWebService, times(1)).logout();`
second parameter can be, `atLeast(1), atLeastOnce(), atMost(), never() and only()`

- Parameters passed can be all mock values or `anyInt(), anyString() or any(Response.class)`; these are called matchers.

- If you use matchers for one of the argument then all of the parameters should be matchers, or if you are passing the actual value to one of the parameter use `of(mockValue)` matcher, for ex:
`verify(mockWebService).login(anyString(), of(PASSWORD));`

- Possible matchers are, `gt(0), lt(100), lte(2020), startsWith('ab'), contains('c3'), matches('n[1-9]'), and(gt(0), lt(1000)), isNotNull(Response.class), not(eq(0))` and so on, check `Mockito.Matchers and Mockito.AdditionalMatchers` class other options

### Stubbing methods:

- When a mock is created for a class, every method in that class returns a default values for the given method

- If you want to return some value, you need to stub the method as follows, for ex:

```java
when(mockWebService.isOnline()).thenReturn(true);
// It is also possible to return multiple values
when(mockWebService.isOnline()).thenReturn(true, false, true); // first time it returns true, second time false and so on
// Can throw exception
when(mockWebService.isOffline()).thenThrow(MyException.class);

/** Alternative syntax try avoid using it, since Mockito doesn't infer the type,
it can be used to override the previous stubbed value
*/
doReturn(true).when(mockWebService).isOffline();

// BDD syntax
given(mockWebService.isOnline()).willReturn(true);
```

### Capturing arguments:

-
