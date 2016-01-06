'use strict';

/**
 * base62 encode implementation based on base62 module:
 * https://github.com/darkskyapp/string-hash
 */

var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encode(integer) {
  if (integer === 0) {
    return '0';
  }
  var s = '';
  while (integer > 0) {
    s = CHARS[integer % 62] + s;
    integer = Math.floor(integer / 62);
  }
  return s;
}

module.exports = encode;
