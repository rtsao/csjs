import {unscoped as csjs} from '../';

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
