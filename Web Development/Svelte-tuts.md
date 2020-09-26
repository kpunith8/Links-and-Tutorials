## Svelte - Yet another UI Library

Compiler

Component based components can be created

No virtual DOM

Truly Reactive

Get Started
```
$ npx degit sveltejs/template svelte-example
$ npm install
$ npm run start
```

## Conditional rendering

### `if-else` statements

```javascript
<script>
let user = { loggedIn: false };

function toggle() {
  user.loggedIn = !user.loggedIn;
}
</script>

{#if user.loggedIn}
  <button on:click={toggle}>
  Log out
  </button>
{else}
  <button on:click={toggle}>
  Log in
  </button>
{/if}
```

### `each` statement

```javascript
<script>
let cats = [
  { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
  { id: 'z_AbfPXTKms', name: 'Maru' },
  { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
  {#each cats as {id, name}}
  <li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
  {name}
  </a></li>
  {/each}
</ul>
```

When you modify the value of an each block, it will add and remove items at
the end of the block, and update any values that have changed, which is not the
desired behaviour, to avoid this, use `keyed each` blocks

```javascript
{#each things as thing (thing.id)} // or (thing)
  <Thing current={thing.color}/>
{/each}
```

### `await` blocks - handling asynchronous code

```javascript
<script>
let promise = getRandomNumber();

async function getRandomNumber() {
  const res = await fetch(`tutorial/random-number`);
  const text = await res.text();

  if (res.ok) {
    return text;
  } else {
     throw new Error(text);
   }
 }

function handleClick() {
  promise = getRandomNumber();
}
</script>

<button on:click={handleClick}>
  generate random number
</button>

{#await promise}
  <p>waiting...</p>
{:then number}
  <p>The number is {number}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

// if promise always resolves, no need of catch block
{#await promise then value}
  <p>the value is {value}</p>
{/await}
```

### DOM events

```javascript
<script>
let m = { x: 0, y: 0 };

function handleMousemove(event) {
  m.x = event.clientX;
  m.y = event.clientY;
}
</script>

<style>
  div { width: 100%; height: 100%; }
</style>

<div on:mousemove={handleMousemove}>
  The mouse position is {m.x} x {m.y}
</div>
```

inline handlers

```javascript
// written without the quotes
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
  The mouse position is {m.x} x {m.y}
</div>
```

### Event modifiers

DOM event handlers can have modifiers that alter their behaviour. For example,
a handler with a `once` modifier will only run a single time:
```javascript
<script>
function handleClick() {
  alert('no more alerts')
}
</script>

<button on:click|once={handleClick}>
  Click me
</button>
```

- The full list of modifiers
  - `preventDefault` — calls `event.preventDefault()` before running the handler. Useful for client-side form handling.
  - `stopPropagation` — calls `event.stopPropagation()`, preventing the event reaching the next element.
  - `passive` — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)
  - `capture` — fires the handler during the capture phase instead of the bubbling phase.
  - `once` — remove the handler after the first time it runs.
  - `self` — only trigger handler if `event.target` is the element itself.

- Chain modifiers together as, `on:click|once|capture={...}`

### Component events

Components can also dispatch events. To do so, they must create an event dispatcher.
```javascript
// Hello.svelte
<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function sayHello() {
  dispatch('message', {
  text: 'Hello!'
  });
}
</script>

// App.svelte
<script>
import Inner from './Hello.svelte';

function handleMessage(event) {
  alert(event.detail.text);
}
</script>

<Inner on:message={handleMessage}/>
```

> `createEventDispatcher` must be called when the component is first instantiated,
  you can't do it later inside e.g. a setTimeout() callback.
  This links `dispatch` to the component instance.

### Events forwarding

Unlike DOM events, component events `don't bubble`. If you want to listen to an event
on some deeply nested component, the intermediate components must forward the event.
```javascript
// App.svelte
<script>
import Outer from './Outer.svelte';

function handleMessage(event) {
  alert(event.detail.text);
}
</script>

<Outer on:message={handleMessage}/>

// Outer.svelte
// Outer forwarding the event to Inner
<script>
import Inner from './Inner.svelte';
</script>

// Just pass the event coming from parent
<Inner on:message/>

// Inner.svelte
<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function sayHello() {
  dispatch('message', {
  text: 'Hello!'
  });
}
</script>

<button on:click={sayHello}>
  Click to say hello
</button>
```

Event forwarding works for `DOM events` too.
```javascript
// App.svelte
<script>
import CustomButton from './CustomButton.svelte';

function handleClick() {
  alert('clicked');
}
</script>

<CustomButton on:click={handleClick}/>

// CustomButton.svelte
<style>
button {
  height: 4rem;
  width: 8rem;
  background-color: #aaa;
  border-color: #f1c40f;
  color: #f1c40f;
  font-size: 1.25rem;
  background-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);
  background-position: 100%;
  background-size: 400%;
  transition: background 300ms ease-in-out;
}

button:hover {
  background-position: 0;
  color: #aaa;
}
</style>

// Just pass on:click to child component
<button on:click>
  Click me
</button>
```

## Bindings

### Text inputs

Binding to value instead of event handlers.
```javascript
<script>
let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```

In the DOM, everything is a string. That's unhelpful when dealing with numeric inputs
`type="number" and type="range"` — it is important to remember to coerce `input.value` before using it.
With `bind:value`, Svelte takes care of coercing
```javascript
<script>
let a = 1;
let b = 2;
</script>

<label>
  <input type=number bind:value={a} min=0 max=10>
  <input type=range bind:value={a} min=0 max=10>
</label>

<label>
  <input type=number bind:value={b} min=0 max=10>
  <input type=range bind:value={b} min=0 max=10>
</label>

<p>{a} + {b} = {a + b}</p>
```

### Check boxes

Checkboxes are used for toggling between states. Instead of binding to `input.value`, bind to `input.checked`
```javascript
<script>
let yes = false;
</script>

<label>
  <input type=checkbox bind:checked={yes}>
  Yes! Send me regular email spam
</label>

{#if yes}
  <p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
  <p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button disabled={!yes}>
  Subscribe
</button>
```
