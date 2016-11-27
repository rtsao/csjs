import extractExtends from './css-extract-extends';
import {isComposition} from './composition';
import buildExports from './build-exports';
import scopify from './scopeify';
import cssKey from './css-key';
import extractExports from './extract-exports';

export default function createHandler({scoped = true} = {scoped: true}) {
  return function csjsHandler(strings, ...values) {
    const css = joiner(strings, values.map(selectorize));
    const preScoped = getClassMap(values);
    const scope = scoped ? scopify(css, preScoped) : extractExports(css);
    const extracted = extractExtends(scope.css);
    const localClasses = without(scope.classes, preScoped);
    const localKeyframes = without(scope.keyframes, preScoped);
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

function getClassMap(values) {
  return values.reduce((acc, val) => {
    if (isComposition(val)) {
      val.classNames.forEach((name, i) => {
        acc[name] = val.unscoped[i];
      });
    }
    return acc;
  }, {});
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
