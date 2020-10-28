# Q!

[![Build Status](https://travis-ci.org/zserge/q.svg?branch=master)](https://travis-ci.org/zserge/q)
[![npm](https://img.shields.io/npm/v/@zserge/q.svg)](http://npm.im/@zserge/q)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@zserge/q/q.min.js?compression=gzip)](https://unpkg.com/@zserge/q/q.min.js)

<div>
<img align="left" src="https://raw.githubusercontent.com/zserge/q/master/logo.png" alt="Q!" />
<br/>
<p>

A really small (well under 1KB minified!) library to explain how VueJS-like frameworks work. Never meant to be used in any of the serious projects. But, hey, despite the tiny code size it supports some smart reactivity and comes with a few of the most common directives, isn't it cool? It was really an exercise in minimalism, and nothing more.

If you liked it - there is a similar [toy ReactJS library](https://github.com/zserge/o).

## Example to whet your appetite

```html
<div id="counter">
	<button q-on:click="clicks++">Click me</button>
	<button q-on:click="clicks=0">Reset</button>
	<p q-text="`Clicked ${clicks} times`"></p>
</div>
<script>
	Q(counter, {click: 0});
</script>
```

Try ["counter" example](https://raw.githack.com/zserge/q/master/counter.html) or try ["todo" example](https://raw.githack.com/zserge/q/master/todo.html).

## API Reference

Hey, it might be quicker to read the sources than this text. Anyway, the following directives are supported:

* `q-text` - updates element innerText.
* `q-html` - updates element innerHTML (use with care).
* `q-if` - toggles "hidden" property if the expression is true.
* `q-on:<event>` - adds an event listener to the element.
* `q-bind:<attr>` - binds element attribute to the expression value.
* `q-model` - binds element (normally, `<input>`) value to the variable.
* `q-each` - renders child elements for each item of the array. Child elements have separate scope, with two special variables - `$it` which is an array element and `$parent` which is a parent data scope.

To initialize the Q app pass the root element and the data model: `Q(el, {name: 'John', age: 42})`.

## What a weird name for a project

The library is called "Q!". A "cue" means a signal to a performer to begin a speech or action, so it's very much related to the concepts of reactivity/observers/watchers etc. Also, "Q" rhymes with "Vue". Moreover, "Q" resembles zero, which is a metaphor for both, library footprint and usefulness. Finally, there is [O!](https://github.com/zserge/o) library which is a similar experiment for React and "Q!" seems like a good companion name.

## License

Code is distributed under MIT license, feel free to use it in your proprietary
projects as well, but I don't advise to do so - better use a proper framework instead.

However, pull requests, issue reports and bug fixes are welcome!
