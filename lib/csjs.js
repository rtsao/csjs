'use strict';

var extractExtends = require('./css-extract-extends');

module.exports = function csjsHandler(strings, ...values) {
  var css = joiner(strings, values);
  return extractExtends(css);
}

/**
 * Joins template string literals and values
 * @param  {array} strings - array of strings
 * @param  {array} values  - array of values
 * @return {string}        - strings and values joined
 */
function joiner(strings, values) {
  return strings.map((str, i) => {
    return (i !== values.length) ? str + values[i] : str;
  }).join('');
}
