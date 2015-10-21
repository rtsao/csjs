'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /(.*?)(?:\s+?)(extends\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;

module.exports = function extractExtends(css, hashed) {
  var extensions = {}; // to be filled with extensions
  var match; // match placeholder for the following while loop

  // begin extracting and replacing all extensions
  while ((match = regex.exec(css)) !== null) {
    var extendee = getClassName(match[1]);
    var keyword = match[2];
    var extended = match[3];
 
    var substr = css.substr(match.index);
    var replaced = substr.replace(keyword, '').replace(extended, '');
    var replacedLen = extended.length + keyword.length;
    regex.lastIndex -= replacedLen;
    css = css.substring(0, match.index) + replaced;

    var classes = [extendee].concat(splitter(extended));
    var unscoped = classes.map(name => hashed[name] ? hashed[name] : name);

    extensions[extendee] = makeComposition(classes, unscoped);
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
