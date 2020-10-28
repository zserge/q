const call = (expr, ctx) =>
  new Function(`with(this){${`return ${expr}`}}`).bind(ctx)();

const directives = {
  html: (el, _, val, ctx) => (el.innerHTML = call(val, ctx)),
  text: (el, _, val, ctx) => (el.innerText = call(val, ctx)),
  if: (el, _, val, ctx) => (el.hidden = !call(val, ctx)),
  on: (el, name, val, ctx) => (el[`on${name}`] = () => call(val, ctx)),
  model: (el, name, val, ctx) => {
    el.value = ctx[val];
    el.oninput = () => (ctx[val] = el.value);
  },
  bind: (el, name, value, ctx) => {
    const v = call(value, ctx);
    if (name === 'style') {
      el.removeAttribute('style');
      for (const k in v) {
        el.style[k] = v[k];
      }
    } else if (name === 'class') {
      el.setAttribute('class', [].concat(v).join(' '));
    } else {
      v ? el.setAttribute(name, v) : el.removeAttribute(name);
    }
  },
  each: (el, name, val, ctx) => {
    const items = call(val, ctx);
    if (!el.$each) {
      el.$each = el.children[0];
    }
    el.innerText = '';
    for (let it of items) {
      const childNode = document.importNode(el.$each);
      const childCtx = {$parent: ctx, $it: it};
      childNode.$q = childCtx;
      Q(childNode, childCtx);
      el.appendChild(childNode);
    }
  },
};

let $dep;

const walk = (node, q) => {
  for (const {name, value} of node.attributes) {
    if (name.startsWith('q-')) {
      const [directive, event] = name.substring(2).split(':');
      const d = directives[directive];
      $dep = () => d(node, event, value, q);
      $dep();
      $dep = undefined;
    }
  }
  for (const child of node.children) {
    if (!child.$q) {
      walk(child, q);
    }
  }
};

const proxy = q => {
  const deps = {};
  for (const name in q) {
    deps[name] = [];
    let prop = q[name];
    Object.defineProperty(q, name, {
      get() {
        if ($dep) {
          deps[name].push($dep);
        }
        return prop;
      },
      set(value) {
        prop = value;
        if (!name.startsWith('$')) {
          for (const dep of deps[name]) {
            dep(value);
          }
        }
      },
    });
  }
  return q;
};

const Q = (el, q) => walk(el, proxy(q));
