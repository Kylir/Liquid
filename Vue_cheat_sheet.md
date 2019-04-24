# Simple VueJS Cheat Sheet

- Simple app

```html
<div id="app">
  {{ message }}
</div>
```

```js
let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

- Data binding to elements

```html
<span v-bind:title="message">
```

- Condition

```html
<span v-if="seen">Now you see me</span>
```

- Loop

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
let app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})
```

- Events (Here it's on click)

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```












