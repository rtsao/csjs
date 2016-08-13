const csjs = require('../').noScope;

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
