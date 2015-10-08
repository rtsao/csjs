'use strict';

const fileScoper = require('./scoped-name');

const keyframesRegex = /(?:@\S*keyframes)(?:\s*?)([^\s\.,{\[>+~#:]+)/g;
const classRegex = /(?:\.)([^\s\.,{\[>+~#:]*)/g;

module.exports = scopify;

function scopify(css, ignores) {

  const makeScopedName = fileScoper(css);

  const replacers = [
    {regex: classRegex, srcPrefix: '.'},
    {regex: keyframesRegex}
  ];

  function scopeCss(result, replacer) {
    function replaceFn(match, matchGroup) {
      const scopedName = ignores[matchGroup] ? matchGroup : makeScopedName(matchGroup);
      result.hashes[scopedName] = matchGroup;
      return replacer.srcPrefix ? replacer.srcPrefix + scopedName : scopedName;
    }
    return {
      css: result.css.replace(replacer.regex, replaceFn),
      hashes: result.hashes
    };
  }

  return replacers.reduce(scopeCss, {
    css: css,
    hashes: {}
  });

}
