const csjs = require('../');

module.exports = csjs`

  .foo {
    color: red;
  }

  .bar extends .foo {
    background: blue;
  }

`;
