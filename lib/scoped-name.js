'use strict';

var hash = require('./hash');

var MAX_HASH_LENGTH = 5; // in production we probably shouldn't truncate

module.exports = function fileScoper(fileSrc) {
  var suffix = hashSuffix(fileSrc);

  return function scopedName(name) {
    return name + '_' + suffix;
  }
}

function hashSuffix(src) {
  return hash(src).substr(0, MAX_HASH_LENGTH);
}
