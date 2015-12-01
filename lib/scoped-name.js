'use strict';

var base62 = require('base62');
var hash = require('string-hash');

module.exports = function fileScoper(fileSrc) {
  var suffix = hashSuffix(fileSrc);

  return function scopedName(name) {
    return name + '_' + suffix;
  }
}

function hashSuffix(src) {
  return base62.encode(hash(src));
}
