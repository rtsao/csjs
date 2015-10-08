'use strict';

const cssKey = require('./css-symbol')

module.exports = function getCss(csjs) {
  return csjs[cssKey];
}
