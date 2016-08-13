const csjs = require('../').noScope;

module.exports = csjs`

  @keyframes woot {
    0%   { opacity: 0; }
    33.3% { opacity: 0.333; }
    100% { opacity: 1; }
  }

`;
