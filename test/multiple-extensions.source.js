const csjs = require('../');

const external = require('./extensions.source');

module.exports = csjs`

  .baz extends ${external.bar} {
    font-size: 12px;
  }

  .fob extends ${external.foo} {
    font-weight: 500;
  }

`;
