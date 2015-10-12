'use strict';

const fileScoper = require('./scoped-name');

const keyframesRegex = /(@\S*keyframes\s*?)([^\s\.,{\[>+~#:]+)/g;
const classRegex = /(\.)([^\s\.,{\[>+~#:]*)/g;

module.exports = scopify;

function scopify(css, ignores) {

  const makeScopedName = fileScoper(css);

  const replacers = [classRegex, keyframesRegex];

  function scopeCss(result, replacer) {
    function replaceFn(fullMatch, prefix, name) {
      const scopedName = ignores[name] ? name : makeScopedName(name);
      result.hashes[scopedName] = name;
      return prefix + scopedName;
    }
    return {
      css: result.css.replace(replacer, replaceFn),
      hashes: result.hashes
    };
  }

  return replacers.reduce(scopeCss, {
    css: css,
    hashes: {}
  });

}
