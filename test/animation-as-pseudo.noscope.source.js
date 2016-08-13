const csjs = require('../').noScope;

module.exports = csjs`

  @keyframes hover {
    0%   { opacity: 0.0; }
    100% { opacity: 0.5; }
  }

  @media (max-width: 480px) {
    .animation:hover {
      background: green;
    }
  }

`;
