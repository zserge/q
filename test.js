const assert = require('assert');
const jsdom = require('jsdom');
const fs = require('fs');

// Global map of tests
const $ = {};

$['call'] = () => {
  assert.equal(call('2+3', null), 5);
  assert.equal(call('a', {a:42}), 42);
  assert.equal(call('a+b', {a:1, b: 2}), 3);
  assert.equal(call('Math.pow(2, a)', {a: 3}), 8);
  global.FOO = 'hello'
  assert.equal(call('FOO', {}), 'hello');
};

$['proxy:simple'] = () => {
  const a = proxy({x: 1, y: 2});
  let called = 0;
  let testCallback = () => called++;
  $dep = testCallback;
  a.x; // subscribe to "x"
  assert.equal(called, 0);
  a.x = 1;
  assert.equal(called, 1);
  a.x = 'foo';
  assert.equal(called, 2);
  a.y = 'first';
  assert.equal(called, 2);
  a.y; // subscribe to "y"
  a.y = 'second';
  assert.equal(called, 3);
};

$['Q:simple'] = () => {
  const model = {name: 'John'};
  const view = `
    <main>
      <p q-text="name"></p>
    </main>
  `;
  const el = new jsdom.JSDOM(view).window.document.querySelector('main');
  Q(el, model);
  assert.equal(el.querySelector('p').innerText, 'John');
  model.name = 'Jane';
  assert.equal(el.querySelector('p').innerText, 'Jane');
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// Try running "+" tests only, otherwise run all tests, skipping "-" tests.
if (
  Object.keys($)
    .filter(t => t.startsWith('+'))
    .map(t => $[t]()).length == 0
) {
  for (let t in $) {
    if (t.startsWith('-')) {
      console.log('SKIP:', t);
    } else {
      console.log('TEST:', t);
      $[t]();
    }
  }
}

