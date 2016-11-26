import {csjs} from '../';

const keyframes = require('./keyframes.source');

module.exports = csjs`

 .woo {
    animation: ${keyframes.yolo} 5s infinite;
  }

  .boo {
     animation-name: ${keyframes.yoloYolo};
   }

`;
