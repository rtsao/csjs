'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /(.*?)(?:\s+?)(?:extends)(?:\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;

var EXTEND_KEYWORD = 'extends';
var EXTEND_KEYWORD_LEN = EXTEND_KEYWORD.length;

module.exports = function extractExtends(css) {
  var extensions = {}; // to be filled with extensions

  var match; // match placeholder for while loop
  // begin extracting and replacing all extensions
  while ((match = regex.exec(css)) !== null) { 
    var extendee = getClassName(match[1]);
    var extended = match[2];
 
    var substr = css.substr(match.index);
    var replaced = substr.replace(EXTEND_KEYWORD, '').replace(extended, '');
    var replacedLen = extended.length + EXTEND_KEYWORD_LEN;
    regex.lastIndex -= replacedLen;
    css = css.substring(0, match.index) + replaced;

    var classes = [extendee].concat(splitter(extended));
    extensions[extendee] = makeComposition(classes);
  }
  // all extensions have now been extracted and replaced

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
