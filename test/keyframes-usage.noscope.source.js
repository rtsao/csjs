const csjs = require('../').noScope;

const keyframes = require('./keyframes.noscope.source');

module.exports = csjs`

 .woo {
    animation: ${keyframes.yolo} 5s infinite;
  }

  .boo {
     animation-name: ${keyframes.yoloYolo};
   }

`;
