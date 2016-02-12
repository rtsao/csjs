'use strict';

var extractExtends = require('./css-extract-extends');
var isComposition = require('./composition').isComposition;
var makeComposition = require('./composition').makeComposition;
var scopify = require('./scopeify');
var cssKey = require('./css-symbol');

module.exports = function csjsHandler(strings) {
  var values = Array.prototype.slice.call(arguments, 1);
  var css = joiner(strings, values.map(selectorize));

  var ignores = values.reduce(function(acc, val) {
    if (isComposition(val)) {
      val.classNames.forEach(function(name, i) {
        acc[name] = val.unscoped[i];
      });
    }
    return acc;
  }, {});

  var scoped = scopify(css, ignores);
  var hashes = Object.assign({}, scoped.classes, scoped.keyframes);
  var extracted = extractExtends(scoped.css, hashes);
  var extensions = extracted.extensions;

  var exports = Object.keys(hashes).reduce(function(acc, key) {
    var val = ignores[hashes[key]] ? ignores[hashes[key]] : hashes[key];
    var isAnimation = Boolean(scoped.keyframes[key]);
    acc[val] = extensions[key] ?
      extensions[key] : makeComposition([key], [val], isAnimation);
    return acc;
  }, {});

  exports[cssKey] = extracted.css;

  return exports;
};

/**
 * Replaces class compositions with comma seperated class selectors
 * @param  value - the potential class composition
 * @return       - the original value or the selectorized class composition
 */
function selectorize(value) {
  return isComposition(value) ? value.selector : value;
}

/**
 * Joins template string literals and values
 * @param  {array} strings - array of strings
 * @param  {array} values  - array of values
 * @return {string}        - strings and values joined
 */
function joiner(strings, values) {
  return strings.map(function(str, i) {
    return (i !== values.length) ? str + values[i] : str;
  }).join('');
}
