# CSJS (Cascading Style JavaScripts)

[![build status][build-badge]][build-href]
[![coverage status][coverage-badge]][coverage-href]
[![dependencies status][deps-badge]][deps-href]

> CSJS allows you to write modular, scoped CSS with valid JavaScript.

## Features
* Extremely simple and lightweight
  * [~2KB browserified, minified, and gzipped][bundle]
* Leverages native ES6 and CSS features <sup>[(1)]</sup> rather than reinventing the wheel
  * Powerful yet dead-simple variables/mixins in CSS using native ES6 template strings
  * Modular styles with explicit dependencies using native CommonJS/ES6 Modules
  * Style composition via natural class composition mechanics already in CSS/HTML
* Works tooling-free; no required transpilation/compilation/build steps <sup>[(2)]</sup>
* Framework-agnostic (No React dependency; works with Web Components, etc.)
* Fully supported native CSS media queries, pseudo-classes, keyframe animations, etc.

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

### Simple, tooling-free

CSJS runs in ES6 environments without transpilation, compilation, or build steps (including Node 4+, Latest stable Chrome/Firefox).

### Framework-agnostic

CSJS works with any framework, be it React, native Web Components, or something else.

### Full power of JavaScript in your CSS

* Real, full-fledged JavaScript
* Obviates the need for Sass/LESS
 * Real variables
 * Real imports/require
 * More powerful mixins
 * As extensible as JavaScript itself

### Class Composition CSS Syntax

CSJS also includes an (optional) handy class composition syntax:

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

### Optional tooling

#### Automatic CSS injection

There is a browserify transform that will automatically inject your CSJS: [csjs-injectify](https://github.com/rtsao/csjs-injectify). It is recommended to use this rather than the [csjs-inject](https://github.com/rtsao/csjs-inject) module directly.

#### Extracted static CSS bundles

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

## See Also
* https://github.com/rtsao/csjs-example-app
* https://github.com/rtsao/csjs-injectify
* https://github.com/rtsao/csjs-inject

## License
MIT

[(1)]: #simple-tooling-free
[(2)]: #extracted-static-css-bundles
[CSS Modules]: https://github.com/css-modules/css-modules
[bundle]: https://www.brcdn.org/csjs/latest?uglify=true

[build-badge]: https://travis-ci.org/rtsao/csjs.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/csjs
[coverage-badge]: https://coveralls.io/repos/rtsao/csjs/badge.svg?branch=master&service=github
[coverage-href]: https://coveralls.io/github/rtsao/csjs?branch=master
[deps-badge]: https://david-dm.org/rtsao/csjs.svg
[deps-href]: https://david-dm.org/rtsao/csjs
