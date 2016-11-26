import {csjs} from '../';

module.exports = csjs`

  @media screen and (min-width: 769px) {
    .foo:not(.bar) {
      display: flex;
    }
  }

`;
