const csjs = require('../');

module.exports = csjs`

  @keyframes yolo {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }

  .foo {
    animation: yolo 5s infinite;
  }

  @keyframes yoloYolo {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }

  .bar {
    animation: yoloYolo 5s infinite;
  }

`;
