'use strict';

const crypto = require('crypto');
const baseX = require('base-x');

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const encoder = baseX(BASE62).encode;

module.exports = function hash(str) {
  return encoder(crypto.createHash('md5').update(str).digest());
}
