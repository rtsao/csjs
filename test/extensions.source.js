const csjs = require('../');

module.exports = csjs`

  .foo {
    color: red;
  }

  .bar extends .foo {
    background: blue;
  }

  .baz extends .bar {
    text-transform: uppercase;
  }

  .bazz extends .bar{
    color: white;
  }

`;
