const csjs = require('../');

module.exports = csjs`

  .foo {
    color: red;
  }

  @media (max-width: 480px) {
    .foo {
      color: blue;
    }
  }

`;
