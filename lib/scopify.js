'use strict';

var classRegex = /(\.)(?!\d)([^\s\.,{\[>+~#:)]+)/g;
var keyframeRegex = /[^\s]+/g;

var extendsRegex = /\.([^\s]+)\s+extends\s+/;

var fileScoper = require('./scoped-name');

module.exports = scopify;

function scopify(css, tokens, ignores) {

  var makeScopedName = fileScoper(css);
  var result = {classes: {}, keyframes: {}};
  var scoped = css;

  function replaceFn(fullMatch, prefix, name) {
    var scopedName = ignores[name] ? name : makeScopedName(name);
    result.classes[scopedName] = name;
    return prefix + scopedName;
  }

  function replaceFnK(fullMatch, prefix, name, suffix) {
    var scopedName = ignores[name] ? name : makeScopedName(name);
    result.keyframes[name] = scopedName;
    return prefix + scopedName + suffix;
  }

  // iterate through keyframes
  tokens.filter(function(token) {
    return token.type === 'keyframes';
  }).forEach(function(token) {
    token.name.replace(/(\s*)([^\s]+)([\s\S]*)/, replaceFnK);
  });

  // build regex
  var keyframeNames = Object.keys(result.keyframes);
  if (keyframeNames.length) {
    var animRegex = new RegExp('(' + keyframeNames.join('|') + ')([;\\s]+|$)');
  }

  var compositions = {};

  for (var i = tokens.length - 1; i >=0; i--) {
    var token = tokens[i];
    var scopedToken = null;
    if (token.type === 'selector') {
      scopedToken = token.text.replace(classRegex, replaceFn);

      var match = extendsRegex.exec(scopedToken);
      if (match) {
        var extendee = match[1];
        var extended = scopedToken.substr(match[0].length + match.index);
        var extendedClasses = splitter(extended);
        scopedToken = scopedToken.substr(0, match.index) + '.' + match[1] + ' ';
        extendedClasses.forEach(function(className) {
          if (!compositions[extendee]) {
            compositions[extendee] = {};
          }
          if (!compositions[className]) {
            compositions[className] = {};
          }
          compositions[extendee][className] = compositions[className];
        });
      }
    } else if (token.type === 'keyframes') {
      scopedToken = '@' + (token.prefix || '') + token.type +
        token.name.replace(/(\s*)([^\s]+)([\s\S]*)/, replaceFnK);
    } else if (
      token.type === 'property' &&
      (token.name === 'animation' || token.name === 'animation-name') &&
      animRegex
    ) {
      scopedToken = token.name + ': ' + token.value.replace(animRegex, function (full, match, suffix) {
        return result.keyframes[match] + (suffix || '');
      });
    }
    if (scopedToken) {
      scoped = replace(scoped, token.start, token.end, scopedToken);
    }
  }

  return {
    css: scoped,
    keyframes: result.keyframes,
    classes: result.classes,
    compositions: compositions
  }
}

function replace(str, start, end, what) {
  return str.substring(0, start) + what + str.substring(end);
};

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}
