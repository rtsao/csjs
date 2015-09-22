'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /(.*?)(?:\s+?)(?:extends)(?:\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;

var EXTEND_KEYWORD = 'extends';
var EXTEND_KEYWORD_LEN = EXTEND_KEYWORD.length;

module.exports = function extractExtends(css) {
  var extensions = {};

  var result;
  while ((result = regex.exec(css)) !== null) {
    var extendee = getClassName(result[1]);
    var extended = result[2];
 
    var substr = css.substr(result.index);
    var replaced = substr.replace(EXTEND_KEYWORD, '').replace(extended, '');
    var replacedLen = extended.length + EXTEND_KEYWORD_LEN;
    regex.lastIndex -= replacedLen;
    css = css.substring(0, result.index) + replaced;

    var classes = [extendee].concat(splitter(extended));
    extensions[extendee] = makeComposition(classes);
  }

  // all extensions have been now replaced
  return {
    css: css,
    extensions: extensions
  }
}

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}
