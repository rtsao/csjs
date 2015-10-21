'use strict';

var crypto = require('crypto');
var baseX = require('base-x');

var BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var encoder = baseX(BASE62).encode;

module.exports = function hash(str) {
  return encoder(crypto.createHash('md5').update(str).digest());
}
