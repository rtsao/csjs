# CSJS (Cascading Style JavaScripts)

> CSJS allows you to write modular, scoped CSS with valid JavaScript.

## Goals and Features
* 100% native JavaScript and vanilla CSS <sup>[(1)]</sup>
* Extremely simple and lightweight
* Framework-agnostic (No React dependency; works with Web Components, etc.)
* No required compilation/build steps <sup>[(2)]</sup>
* Scoped CSS via hashing of class names
* Style composition via natural class composition mechanics already in CSS/HTML
* Modular styles with explicit dependencies using native CommonJS/ES6 Modules

## Quick Example

**styles.js**
```javascript
const csjs = require('csjs');

const green = '#33aa22';

module.exports = csjs`

  .foo {
    border: 1px solid black;
    background-color: ${green};
  }
  
  .bar {
    padding: 4px;
    font-family: serif;
    font-size: 15px;
  }

`;

```

**component.js**
```javascript

const React = require('react');
const div = React.DOM.div;

const {foo, bar} = require('./styles');

module.exports = React.createClass({
  render() {
    return div({className: foo}, [
      'hello world'
      div({className: bar}, ['hi!'])
    ]);
  }
});
```

**rendered html**
```html
<div class="foo_19Yy9">
  hello world
  <div class="bar_19Yy9">hi!</div>
</div>
```

## Native

CSJS runs in ES6 environments without compilation or build steps (including Node 4+, Latest stable Chrome/Firefox).

Writing CSJS is just like writing vanilla CSS with two exceptions:

1. You may use JS in your CSS (just like any other ES6 template string!)
2. CSJS introduces an optional `extends` keyword into your CSS which allows for extremely convenient class composition.

## Framework-agnostic

CSJS works with any framework, be it React, native Web Components, or something else.

## Full power of JavaScript in your CSS

* Real, full-fledged JavaScript
* Obviates the need for Sass/LESS
 * Real variables
 * Real imports/require
 * More powerful mixins
 * As extensible as JavaScript itself

## Composition CSS Syntactic Sugar

CSJS also includes an (optional) handy class composition syntactic sugar:

**common-styles.js**
```javascript
const csjs = require('csjs');

module.exports = csjs`

  .foo {
    border: 1px solid black;
  }
  
  .bar {
    padding: 4px;
    font-family: serif;
    font-size: 15px;
  }

`;

```

**button-styles.js**
```javascript
const csjs = require('csjs');

const common = require('./common-styles');

module.exports = csjs`

  .button extends ${common.foo} {
    background: #ccc;
    border-radius: 4px;
  }
  
  .superButton extends .button, ${common.bar} {
    background: red;
    font-weight: bold;
  }

`;

```

**component.js**
```javascript

var buttonStyles = require('./button-styles');
var getCss = require('csjs/get-css');

buttonStyles.superButton;
// => "foo_19Yy9 bar_19Yy9 button_4fdaQ superButton_4fdaQ"

getCss(buttonStyles);
/*
  .button_4fdaQ {
    background: #ccc;
    border-radius: 4px;
  }
  
  .superButton_4fdaQ {
    background: red;
    font-weight: bold;
  }

*/
```

## Automatic CSS injection

There is a browserify transform that will automaticaly inject your CSJS: [csjs-injectify](https://github.com/rtsao/csjs-injectify). It is recommended to use this rather than the [csjs-inject](https://github.com/rtsao/csjs-inject) module directly.

## Extracted static CSS bundles

Coming soon is a browserify plugin that will allow you to extract out your application's CSJS into a static CSS file (rather than injecting styles at runtime).

## FAQ

##### Why the name CSJS?

CSJS files are valid JavaScript, hence the name Cascading Style JavaScripts.

##### Why not Sass?

Sass doesn't provide any way to scope CSS, thus encapsulation of styles in components isn't possible with Sass alone. Additionally, because Sass was designed for use in a global CSS namespace, many of its features just don't make sense when styles are scoped and encapsulated in components. `@extend` in Sass is extremely problematic, whereas CSJS has a proper mechanism for class composition that actually works like it should. Furthermore, with CSJS you have the ability to use real JavaScript in CSS, which is significantly more powerful and extensible than the language features included in Sass, so there's no need to use Sass at all.

##### Why not CSS Modules?

CSJS was inspired by [CSS Modules] and they are virtually identical in concept. However, the key difference is CSS Modules attempts to reproduce an ES6-style module system into your CSS, whereas CSJS simply uses native JS modules and provides a convenient way to write scoped, modular CSS.

One advantage is CSJS is valid JavaScript so it works without any extra tooling (CSS Modules is not valid CSS). Also, because of CSJS merely reuses the native module system and standard ES6 tagged template strings, it is extremely lightweight.

##### Why not Radium?

Inline styles are cool, but there are limitations to using pure inline styles. For example, things like pseudo-classes and media queries aren't possible with inline styles. Radium works around this by wrapping React's render method to be able to re-implement things like psuedo-classes and media queries. Thus Radium is wholly dependent on React. CSJS has no such dependency, and can work with any framework or vanilla JS.

Pure inline styles makes a lot sense if you have lots of dynamic styles with runtime calculations, but there's no benefit in the case of static styles if you can get scoping through other means. If your styles are "static", using Radium involves unnecessary overhead.

[(1)]: #native
[(2)]: #extracted-static-css-bundles
[CSS Modules]: https://github.com/css-modules/css-modules
