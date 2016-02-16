const csjs = require('../');

const external = require('./extensions.source');

module.exports = csjs`

  .lol {
    font-family: serif;
  }

  .baz extends .lol, ${external.bar} {
    font-size: 12px;
  }

  .fob extends ${external.foo} {
    font-weight: 500;
  }

`;
