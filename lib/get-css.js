'use strict';

var cssKey = require('./css-symbol');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};
