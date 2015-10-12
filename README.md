# CSJS (Cascading Style JavaScripts)

## What is CSJS?
CSJS allows you to write modular, scoped CSS with valid JavaScript.

## Goals and Features
* 100% native JavaScript and CSS <sup>[(1)]</sup>
* Extremely simple and lightweight
* Framework-agnostic (No React dependency; works with Web Components, etc.)
* No required compilation/build steps <sup>[(2)]</sup>
* Scoped CSS via hashing of class names
* Style composition via natural class composition mechanics already in CSS/HTML
* Modular styles with explicit dependencies using native CommonJS/ES6 Modules

## Native

CSJS runs in ES6 environments without compilation or build steps (including Node 4+, Latest stable Chrome/Firefox).

## Framework-agnostic

CSJS works with any framework, be it React, native Web Components, or something else.

## Full power of JavaScript in your CSS

* Real, full-fledged JavaScript
* Obviates the need for Sass/LESS
 * Real variables
 * Real imports/require
 * More powerful mixins
 * As extensible as JavaScript itself

## Extracted static CSS bundles

Soon there will be tooling that will allow you to extract out your application's CSJS into a static CSS file (rather than injecting styles at runtime).

## FAQ

#### Why the name CSJS?

CSJS files are valid JavaScript, hence the name Cascading Style JavaScripts.

#### Why not Sass?

Sass doesn't provide any way to scope CSS, thus encapsulation of styles in components isn't possible with Sass alone. Additionally, because Sass was designed for use in a global CSS namespace, many of its features just don't make sense when styles are scoped and encapsulated in components. `@extend` in Sass is extremely problematic, whereas CSJS has a proper mechanism for class composition that actually works like it should. Furthermore, the ability to use real JavaScript in CSS is significantly more powerful and extensible than the language features included in Sass, so there's not really any need to use Sass at all.

#### Why not CSS Modules?

CSJS was inspired by [CSS Modules] and they are virtually identical in concept. However, the key difference is CSS Modules attempts to reproduce an ES6-style module system into your CSS, whereas CSJS simply uses native JS modules and provides a convenient way to write scoped, modular CSS.

One advantage is CSJS is valid JavaScript so it works without any extra tooling (CSS Modules is not valid CSS). Also, because of CSJS merely reuses the native module system and standard ES6 tagged template strings, it is extremely lightweight.

#### Why not Radium?

Radium is cool, but there are limitations to using pure inline styles. Radium relies on wrapping React's render method to be able to re-implement things like psuedo-classes and media queries, which aren't possible with inline styles. These just work normally in CSJS because it is normal CSS. Pure inline styles makes a lot sense if you have lots of dynamic styles with runtime calculations, but there's no benefit in the case of static CSS if you can get scoping through other means.

[(1)]: #native
[(2)]: #extracted-static-css-bundles
[CSS Modules]: https://github.com/css-modules/css-modules
