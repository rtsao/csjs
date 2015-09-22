'use strict';

var extractExtends = require('./css-extract-extends');
var Composition = require('./composition').definition;

module.exports = function csjsHandler(strings, ...values) {
  var css = joiner(strings, values.map(selectorize));
  return extractExtends(css);
}

/**
 * Replaces class compositions with comma seperated class selectors
 * @param  value - the potential class composition
 * @return       - the original value or the selectorized class composition
 */
function selectorize(value) {
  return value instanceof Composition ? value.selector : value;
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
