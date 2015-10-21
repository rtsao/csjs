'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /(.*?)(?:\s+?)(extends\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;

module.exports = function extractExtends(css, hashed) {  
  var found, matches = [];
  while (found = regex.exec(css)) {
    matches.unshift(found);
  }

  function reduceMatch(acc, match) {
    var extendee = getClassName(match[1]);
    var keyword = match[2];
    var extended = match[3];

    // remove from output css
    var index = acc.css.indexOf(keyword, match.index);
    var len = keyword.length + extended.length;
    acc.css = acc.css.slice(0, index) + acc.css.slice(index + len);
    
    // add to output extensions
    var classes = [extendee].concat(splitter(extended));
    var unscoped = classes.map(name => hashed[name] ? hashed[name] : name);
    acc.extensions[extendee] = makeComposition(classes, unscoped);

    return acc;
  }

  return matches.reduce(reduceMatch, {
    css: css,
    extensions: {}
  });
}

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}
