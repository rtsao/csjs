# CSS Comments

CSJS will ignore everything inside CSS `/* */` comments, but preserve it in the output CSS. Note that CSJS will break if there are unbalanced comments.

([Live editable codepen.io demo](http://codepen.io/rtsao/pen/MKNaPR?editors=0010))

```javascript
const csjs = require('csjs');
const {h1} = require('react').DOM;

const styles = csjs`
  
  /*
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  */

  /* .foo { color: red; } */

  .pulse {
    animation: 1s ease-in-out infinite fadeIn alternate;
  }

`;

const html = require('react-dom/server').renderToStaticMarkup(
  h1({className: styles.title}, 'Hello World!')
);
/*
<h1 class="pulse_1uRFrA">Hello World!</h1>
*/

console.log(styles);
// => {pulse: "pulse_1uRFrA"}
```
