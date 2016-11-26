import extractExtends from './css-extract-extends';
import {isComposition, ignoreComposition} from './composition';
import buildExports from './build-exports';
import scopify from './scopeify';
import cssKey from './css-key';
import extractExports from './extract-exports';

export default function createHandler(opts = {}) {
  const noscope = (typeof opts.noscope === 'undefined') ? false : opts.noscope;

  return function csjsHandler(strings, values) {
    // Fast path to prevent arguments deopt
    var values = Array(arguments.length - 1);
    for (let i = 1; i < arguments.length; i++) {
      values[i - 1] = arguments[i];
    }
    const css = joiner(strings, values.map(selectorize));
    const ignores = ignoreComposition(values);

    const scope = noscope ? extractExports(css) : scopify(css, ignores);
    const extracted = extractExtends(scope.css);
    const localClasses = without(scope.classes, ignores);
    const localKeyframes = without(scope.keyframes, ignores);
    const compositions = extracted.compositions;

    const exports = buildExports(localClasses, localKeyframes, compositions);

    return Object.defineProperty(exports, cssKey, {
      enumerable: false,
      configurable: false,
      writeable: false,
      value: extracted.css
    });
  }
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
  return strings.map((str, i) => (i !== values.length) ? str + values[i] : str).join('');
}

/**
 * Returns first object without keys of second
 * @param  {object} obj      - source object
 * @param  {object} unwanted - object with unwanted keys
 * @return {object}          - first object without unwanted keys
 */
function without(obj, unwanted) {
  return Object.keys(obj).reduce((acc, key) => {
    if (!unwanted[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
