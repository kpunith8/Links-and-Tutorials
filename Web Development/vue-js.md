## Vue JS

### Vue Version 2 - Basic Concepts

#### Components

```html
<html>
  <head>
    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <first-component></first-component>
    </div>
    <script>
      Vue.component("first-component", {
        template: "<div>Hello from Component {{ message }}</div>",

        data: function () {
          return {
            message: "Hello from Data",
          }
        },
      });

      var app = new Vue({
        el: "#app",
        data: {},
      })
    </script>
  </body>
</html>
```

#### Slots

```html
<div id="app">
  <first-component>
    <ul>
      <li>Item-1</li>
      <li>Item-2</li>
    </ul>
    <!-- Named slots -->
    <template v-slot="named-slot">
      Named slot
    </template>
  </first-component>
</div>
<script>
  Vue.component("first-component", {
    template: '<div><slot></slot> <slot name="named-slot"></slot></div>', // <slot> is a special tag that allows you to insert content into the component

    data: function () {
      return {
        message: "Hello",
      }
    },
  });
</script>
```

- Passing props to the components
```html
<div id="app">
  <!-- Passing JSON string/object as a prop, the prop needs to be bound using v-bind:link or the shorthand :link -->
  <title-component user-id="123" :link='{title: "Home", link: "#home"}'> 
</div>
<script>
  Vue.component("title-component", {
    template: '<div>{{userId}}</div><div>{{link.title}}</div>',
    props: ["userId", "link"], // kebab case props are mapped to camel case props in the component
  });
</script>
```

- Components in a separate file - built using vue-cli
```html
<!-- TestComponent.vue -->
<template>
  {{message}} from single test component
</template>
<script>
  module.exports = {
    data:  {
      helol: "Hello",
    },
    // Props with default values and types associated
    props: {
      message: {
        type: String,
        required: true,
      },
      age: {
        type: [Number, String],
        default: 1,
      },
    },
    methods: {
      greet: function () {
        return this.message + " " + this.age;
      },
    },
  };
</script>
<!-- scoped attribute will make the style defined in the componet to be used within this component -->
<style scoped>
</style>
```

-  `index.js` file
```js
import Vue from 'vue';
import TestComponent from './TestComponent'

// Register the component globally
Vue.component('test-component', TestComponent);

new Vue({
  el: '#app',
  data: {
    message: 'test'
  },
  components: {
    TestComponent, // Register the component locally
  },
});
```

- `index.html` file
```html
<html>
<head>
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
</head>

<body>
  <div id="app">
    <test-component :message="Hello"></test-component>
  </div>

  <script src="index.pack.js"></script>
</body>
</html>
```

#### Events

- Vue directive `v-on:[event-type]=[function]`, possible event types are, `submit`, `click`, `keyup`, `dbclick` etc.,

- `Modifiers` on v-on directive, `v-on:[event-type].modifier=[function]`, possible modifiers are, 
  - `.prevent` - to prevent the default action
  - `.keyup.esc`, `keyup.enter`, `click.alt` - Key presses 
  - `.once` - to prevent the event from being called multiple times

- Custom events can be emitted using `v-on:click="$emit('event-name', data)"`

- Shorthand to use `v-on:` is `@`, for example, `<button @click="onClick">Click Me</button>`

- Use `$event` to access the value from the custom event inline
```html
<input-field label="First Name" unique="first_name" v-on:updated="form.first_name = $event"></input-field>
```

- Value from the custom event can be accessed inside a method 
```html
 <!-- input-filed component  -->
<template>
    <div class="input-wrapper">
        <label :for="unique">{{ label }}</label>
        <input type="text" :id="unique" v-model="value" @input="$emit('updated', value)" />
    </div>
</template>

<script>
  module.exports = {
    props: {
      label: String,
      unique: String,
    },
    
    data: function () {
      return {
        value: ''
      }
    }
  }
</script>

<input-field label="First Name" unique="first_name" @updated="onUpdated"></input-field>
<script>
  new Vue({
    methods: {
      onUpdated: function (value) {
        this.form.first_name = value;
      },
    },
  })
</script>
```

#### Component to Component communication using events 

- Emit events to an `event bus`
- Register any component which wants to listen in that channel
- Can have many components listening to the same channel

```html
 <!-- component-a.vue -->
<template>
  <button class="p-4 border bg-gray-100 rounded-lg mb-12" @click="sayHello">Say Hello to Component B!</button>    
</template>

<script>
  const EventBus = require('./bus');

  module.exports = {
    methods: {
      sayHello: function () {
        EventBus.$emit('say-hello');
      }
    }
  }
</script>
```
```html
 <!-- component-b.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
  const EventBus = require('./bus');
  
  module.exports = {
    data: function () {
      EventBus.$on('say-hello', () => {
        this.message = 'Hello from Component B!';
      });

      return {
        message: 'Lonely Component Here!'
      }
    }
  }
</script>
```

- Event bus 
```js
// bus.js
import Vue from 'vue';

module.exports = new Vue();
```

### Component Lifecycles

```js
import Vue from 'vue';

new Vue({
  el: '#app',
  
  created() {
    console.log('Vue instance created!');
  },
  mounted() {
    console.log('Vue instance mounted!');
  },
  destroyed() {
    console.log('Vue instance destroyed!');
  },
  beforeCreate() {
    console.log('Vue instance beforeCreate!');
  },
  
  components: {},
});
```

- Fetching from API
```html
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{error.message}}</div>
    <ul v-else>
      <li v-for="(todo, key) in todos">{{ todo.title }}</li>
    </ul>
  </div>
<script>
  new Vue({
    mounted() {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
          this.loading = false;
          this.todos = json
        }).catch(error => {
          this.loading = false;
          this.error = error
        });
    },
    data: {
      loading: true,
      error: null,
      todos = [],
    }
  });
</script>
```

### Vue Router

```html
<div id="app">
  <router-link to="/home">Home</router-link>
  <router-link to="/about">About</router-link>
  
  <router-view></router-view>
</div>

<!-- home.vue -->
<script>
  <template>
    <p>Home Content</p>
  </template>
</script>

<!-- about.vue -->
<script>
  <template>
    <p>About Us</p>
  </template>
</script>

<!-- post.vue -->
<script>
  <template>
    <p>{{$route.params.id}}</p>
  </template>
</script>

<!-- posts.vue -->
<template>
    <div>
        <router-link v-for="(post, index) in posts" :to="'/posts/' + index">{{ post }}</router-link>
    </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        posts: [
          'My first post',
          'Another Post',
          'My final post',
        ]
      }
    }
  }
</script>
<!-- posts.vue end -->

<!-- index.js -->
<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  Vue.use(VueRouter);

  const routes = [
    { path: '/home', component: Home },
    { path: '/about', component: About },
    { path: '/posts', component: Posts },
    { path: '/post:id', component: Post },
  ];

  const router = new VueRouter({
    routes
  });

  new Vue({
    el: '#app',
    router,
    components: {  
    },
    data: {},
  });
</script>
```

- `this.$router.push({ path: '/about' })` - Push a new route to the router

### Vuex - State management

- Data is extracted into a single source of truth called `store`
- 1 store for one app
- Use for large apps where one or more components need to access and manipulate the same data

```js
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    message: 'Hello from vuex store',
    prefix: 'Message',
    post: {},
  },
  // Getters are like computed properties for the store
  getters: {
    prefix: state => {
      return state.prefix.toUpperCase();
    },
    getMessage: (state, getters) => + getters.prefix + ' ' + state.message,
  },
  mutations: {
    setMessage: (state, newMessage) => {
      state.message = newMessage;
    },
    resetPrefix: (state) => {
      state.prefix = 'Unset: ';
    },
    setPost: (state, post) => {
      state.post = post;
    },
  },
   actions: {
     fetchPost: context => {
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(post => {
          context.commit('setPost', post);
          // Dispatch another action to update the message
          context.dispatch('resetMessage');
        }).catch(error => {
          context.commit('setMessage', error.message);
        });
    },
    resetMessage: context => {
      context.commit('resetPrefix');
      context.commit('setMessage', context.state.post.title);
    },
  }
});

module.exports = store;
```

```js
// index.js
import store from './store';
import {mapGetters} from 'vuex';

new Vue({
  el: '#app',
  store,
  components: {  
  },
  data: {},
  methods: {
    updateMessage: function () {
      this.$store.dispatch('resetMessage');
    }
  },
  computed: {
    ...mapGetters([
      'getMessage',
    ]),
  }
});
```

```html
<html>
<head>
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
</head>

<body>
  <div id="app">
    <!-- To access the state from store -->
    {{ $store.state.message }}
    {{ $store.getters.getMessage }}
    <!-- Calling mutations -->
    {{ $store.commit('setMessage', 'Mutated text') }}
    <button @click="updateMessage">Update message</button>
  </div>
  
  <script src="index.pack.js"></script>
</body>
</html>
```

- Two way binding with vuex between components
```html
<template>
    <input v-model="message" />
</template>

<script>
  module.exports = {
    computed: {
      message: {
        get() {
          return this.$store.state.message;
        },
        set(value) {
          this.$store.commit('setMessage', value);
        }
      }
    }
  }
</script>
```

### Advanced concepts

- `Watchers`
```html
<template>
    <div>
        {{ count }}
    </div>
</template>

<script>
  module.exports = {
    props: [
      'count'
    ],
    watch: {
      count: function (newValue, oldValue) {
      }
    }
  }
</script>
```

- `Mixins` - to share functionality between components
```html
<template>
  <div>
    {{ formatMoney(245) }}
  </div>
</template>

<script>
  const mixin = require('./mixins/general');
  
  module.exports = {
    mixins: [mixin],
  }
</script>
```
```js
// mixin/general.js
module.exports = {
  methods: {
    formatMoney: function (amount) {
      return '$' + amount;
    }
  }
};
```

- Making a mixin available to all components globally, here we don't need to import the mixin to each component needing it,
but it should be imported in the main app file
```js
import Vue from 'vue';

Vue.mixin({
  methods: {
    formatMoney: function (amount) {
      let dollar = amount / 100;
      let sign = '$ ';
      
      if (dollar < 0) {
        sign = '-$ ';
        dollar *= -1;
      }
      
      return sign + dollar.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  }
});
```

- Mixins can also be overwritten by methods inside a component according ot their needs

- `Transitions` - to animate components, `v-enter`, `v-leave`, `v-enter-to`, `v-leave-to`, and etc.,
```html
<template>
    <div>
      <!-- Adding name property need an update to class names in the style tag, change .v-enter to .fade-enter -->
      <transition appear name="fade">
          <h1 v-if="text" class="text-6xl">Hello</h1>
      </transition>
      
      <button @click="text = !text">Toggle</button>
  </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        text: true
      }
    }
  }
</script>

<style>
  .v-enter, .v-leave-to  {
    opacity: 0;
  }
  .v-enter-to, .v-leave {
    opacity: 1;
  }
  .v-enter-active, .v-leave-active {
    transition: all 2s;
  }
</style>
```

- `Filters` - Passing data through a filter to decorate 
```html
<template>
  <div>
    <h1 v-if="text" class="text-6xl">{{ myString | capitalize(amount) | standout }}</h1>
  </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        text: true,
        myString: 'hello',
        amount: 10
      }
    },
    filters: {
      capitalize: function (value, amount) {
        value = value.toString();
        
        let returnValue = value.charAt(0).toUpperCase() + value.slice(1);
        
        if (amount >= 10) {
          returnValue = '@' + returnValue;
        }
        
        return returnValue
      },
      
      standout: function (value) {
        return value + '!';
      }
    }
  }
</script>
```

- Making filters available globally
```js
Vue.filter('capitalize', function (value, amount) {
  value = value.toString();
  
  let returnValue = value.charAt(0).toUpperCase() + value.slice(1);
  
  if (amount >= 10) {
    returnValue = '@' + returnValue;
  }
  
  return returnValue;
});
```