/**
 * base62 encode implementation based on base62 module:
 * https://github.com/andrew/base62.js
 */

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function encode(integer) {
  if (integer === 0) {
    return '0';
  }
  let str = '';
  while (integer > 0) {
    str = CHARS[integer % 62] + str;
    integer = Math.floor(integer / 62);
  }
  return str;
};
