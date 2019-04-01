# Java Unit Testing

## JUnit
- Throwing an exception with a custom message
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

## Mockito

- If you are using annotations to mock a class, make sure it is initialized in a method with JUnit4's `@Before` annotation, since
annotations don't initialize themselves, for ex: In this case it is initialized in a `setUp()`
	```java
	@Before
	public void setUp()
	{
		MockitoAnnotations.initMocks(this);
	}
	```

- It can also be done using '@Rule' annotation on MockitoRule `eg:
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
public void testLogoutOfAnUser()
{
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

### Stubbing methods

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

### Capturing arguments

```java
@Captor
private ArgumentCaptor<Respose> resposeCaptor;

@Test
public void testLoginSuccessful_captureArguments()
{
	User user = new User(mockWebService, USER_ID, PASSWORD);
	user.login(mockLoginInterface);

	verify(mockWebService).login(resposeCaptor.capture()); // It captures the login info
	Response response = resposeCaptor.getValue();

	response.onRequestedCompleted(true); // Invoke the action to be performed on captor
	verify(mockLoginInterface).onLoginSuccess();
}
```

### Custom Matchers

- Matcher to check list contains
	```java
	public class ListContains<T> implements ArgumentMatcher<List>
	{
		private final T object;

		public ListContains(T object)
		{
			this.object = object;
		}

		@Override
		public boolean matches(List list)
		{
			return list.contains(object);
		}

		@Override
		public String toString()
		{
			return "List doesn't contain object";
		}
	}
	```

### Testing final methods and classes

- Create a wrapper class
	```java
	public class HandlerWrapper
	{
		private final Handler handler; // Handler which has final methods

		public HandlerWrapper()
		{
			this.handler = new Handler();
		}

		public boolean post(Runnable r)
		{
			return handler.post(r);
		}

		public boolean sendMessage(Message message)
		{
			return handler.sendMessage(message);
		}
	}
	```
	
### Mocking a class implementing multiple interfaces

- If a class implements multiple interfaces, then withSettings can be used to build a mock class as follows
	```java
	MockSettings settings = Mockito.withSettings();
  EmployeeManager mockEmployeeManager = Mockito.mock(EmployeeManager.class,
  settings.extraInterfaces(SalaryStructure.class));
	```
	
### Limitations

- Cannot mock static methods, private methods, and `hashCode() and equals()` methods

### References

- https://www.youtube.com/watch?v=DJDBl0vURD4 (video link)
- Download https://dzone.com/refcardz/mockito
