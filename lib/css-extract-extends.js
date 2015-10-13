'use strict';

const makeComposition = require('./composition').makeComposition;

const regex = /(.*?)(?:\s+?)(extends\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;

module.exports = function extractExtends(css, hashed) {
  let extensions = {}; // to be filled with extensions
  let match; // match placeholder for the following while loop

  // begin extracting and replacing all extensions
  while ((match = regex.exec(css)) !== null) { 
    const extendee = getClassName(match[1]);
    const keyword = match[2];
    const extended = match[3];
 
    const substr = css.substr(match.index);
    const replaced = substr.replace(keyword, '').replace(extended, '');
    const replacedLen = extended.length + keyword.length;
    regex.lastIndex -= replacedLen;
    css = css.substring(0, match.index) + replaced;

    const classes = [extendee].concat(splitter(extended));
    const unscoped = classes.map(name => hashed[name] ? hashed[name] : name);

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
