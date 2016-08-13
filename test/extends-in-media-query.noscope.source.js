const csjs = require('../').noScope;

const basic = require('./basic.noscope.source');

module.exports = csjs`

  .woot {
    color: red;
  }

  .hello {
    font-size: 10px;
  }

  .yay {
    font-weight: bold;
  }

  @media (max-width: 480px) {
    .woot extends .hello, .yay {
      color: blue;
    }
  }

  @media (max-width: 580px) {
    .woot extends ${basic.foo}, .underline {
      color: green;
    }
  }

  .underline {
    text-decoration: underline;
  }

`;
