'use strict';

const extractExtends = require('./css-extract-extends');
const isComposition = require('./composition').isComposition;
const makeComposition = require('./composition').makeComposition;
const scopify = require('./scopeify');
const cssKey = require('./css-symbol');

module.exports = function csjsHandler(strings, ...values) {
  const css = joiner(strings, values.map(selectorize));

  const ignores = values.reduce((acc, val) => {
    if (isComposition(val)) {
      val.classNames.forEach((name, i) => {acc[name] = val.unscoped[i]});
    }
    return acc;
  }, {});

  const scoped = scopify(css, ignores);
  const hashes = scoped.hashes;
  const extracted = extractExtends(scoped.css, hashes);
  const extensions = extracted.extensions;

  const exports = Object.keys(hashes).reduce((acc, key) => {
    const val = ignores[hashes[key]] ? ignores[scoped.hashes[key]] : hashes[key];
    acc[val] = extensions[key] ? extensions[key] : makeComposition([key], [val]);
    return acc;
  }, {});

  exports[cssKey] = extracted.css;

  return exports;
}

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
  return strings.map((str, i) => {
    return (i !== values.length) ? str + values[i] : str;
  }).join('');
}
