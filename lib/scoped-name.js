'use strict';

const hash = require('./hash');

const MAX_HASH_LENGTH = 5; // in production we probably shouldn't truncate

module.exports = function fileScoper(fileSrc) {
  const suffix = hashSuffix(fileSrc);

  return function scopedName(name) {
    return name + '_' + suffix;
  }
}

function hashSuffix(src) {
  return hash(src).substr(0, MAX_HASH_LENGTH);
}
