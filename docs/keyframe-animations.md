# CSS3 Keyframe Animations

## Scoped Animations

CSJS scopes your keyframe animations just like class names. Note that they occupy the same namespace, so you can't export a keyframe animation with the same name as a class in the same template string literal.

([Live editable codepen.io demo](http://codepen.io/rtsao/pen/KVOdWB?editors=0010))

```javascript
const csjs = require('csjs');
const {h1} = require('react').DOM;

const styles = csjs`

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .pulse {
    animation: 1s ease-in-out infinite fadeIn alternate;
  }

`;

const html = require('react-dom/server').renderToStaticMarkup(
  h1({className: styles.title}, 'Hello World!')
);
/*
<h1 class="pulse_1G6o1t">Hello World!</h1>
*/

const css = csjs.getCss(styles);
/*
@keyframes fadeIn_1G6o1t {
  from { opacity: 0; }
  to { opacity: 1; }
}

.pulse_1G6o1t {
  animation: 1s ease-in-out infinite fadeIn_1G6o1t alternate;
}
 */
```
