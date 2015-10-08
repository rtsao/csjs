'use strict';

const makeComposition = require('./composition').makeComposition;

const regex = /(.*?)(?:\s+?)(?:extends)(?:\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;

const EXTEND_KEYWORD = 'extends';
const EXTEND_KEYWORD_LEN = EXTEND_KEYWORD.length;

module.exports = function extractExtends(css, hashDictionary) {
  let extensions = {}; // to be filled with extensions
  let match; // match placeholder for the following while loop

  // begin extracting and replacing all extensions
  while ((match = regex.exec(css)) !== null) { 
    const extendee = getClassName(match[1]);
    const extended = match[2];
 
    const substr = css.substr(match.index);
    const replaced = substr.replace(EXTEND_KEYWORD, '').replace(extended, '');
    const replacedLen = extended.length + EXTEND_KEYWORD_LEN;
    regex.lastIndex -= replacedLen;
    css = css.substring(0, match.index) + replaced;

    const classes = [extendee].concat(splitter(extended));
    const unscoped = classes.map((name) => hashDictionary[name] ? hashDictionary[name] : name);

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
  const trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}
