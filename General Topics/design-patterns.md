# Design Patterns, Elements of Reusable OO Software 

> Gang of Four: Erich Gamma, Richard Helm, Ralf Johnson, and John M. Vlissides

3 Types: `Creational`, `Behavioral`, and `Structural` 

### Advantages

1. Design patterns make it easier to `reuse successful designs and architectures`. Expressing proven techniques as design patterns makes them more accessible to developers of new systems. 
2. Design patterns help you choose `design alternatives` that make a `system reusable` and avoid alternatives that compromise reusability. 
3. Design patterns can even `improve the documentation` and `maintenance of existing systems` by furnishing an explicit specification of class and object interactions and their underlying intent. 

- Design patterns help a designer get a design `right` faster.

### What is DP 

`Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice` - **Christopher Alexander** [Talking about patterns in buildings and towns]

- In OO, solutions are expressed in terms of `objects` and `interfaces`


- Pattern is a solution to a problem in a context.

A pattern has `four` essential elements:

1. `Pattern Name` - describes a design problem, solutions, and conseuqnces. Design at high level of abstraction.
Having a name is easy for documentation. It makes it easier to think about designs and to communicate them and their trade-offs to others.

2. `Problem` - describes when to apply the pattern. It explains the problem and its context. Sometimes the problem will include a list of conditions that must be met before it makes sense to apply the pattern.

3. `Solution` - describes the elements that make up the design, `their relationships`, `responsibilities`, and `collaborations`. The solution `doesn't describe` a particular concrete design or implementation, because a pattern is like a `template` that can be applied in many different situations. Instead, the pattern provides an `abstract description` of a design problem and how a general arrangement of elements (classes and objects in our case) solves it.

4. `Consequences` - the results and trade-offs of applying the pattern. The consequences for software often concern `space` and `time` trade-offs. The consequences of a pattern include its `impact` on a `system's flexibility`, `extensibility`, or `portability`. Listing these consequences explicitly helps you understand and evaluate them.

> DP's are descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context.


- A design pattern `names`, `abstracts`, and `identifies` the key aspects of a common design structure that make it useful for creating a reusable object-oriented design.

- The design pattern `identifies` the participating `classes` and `instances`, their `roles` and `collaborations`, and the `distribution` of `responsibilities`.

### MVC 

- It `decouples` views and models by establishing a `subscribe/notify` protocol between them. 
- The `model` is the application object.
- A `view` must ensure that its appearance reflects the state of the model. Whenever the model's data changes, the `model notifies` views that depend on it. In response, each view updates itself. Allows to attach `multiple views` to a model to provide different presentations. You can also create new views for a model without rewriting it.
- The `controller` defines the way the user interface reacts to user input.
