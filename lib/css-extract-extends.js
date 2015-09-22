var regex = /(.*?)(?:\s+?)(?:extends)(?:\s+?)((?:.|\n)*?){(?:(?:.|\n)*?)}/g;

var EXTEND_KEYWORD = 'extends';
var EXTEND_KEYWORD_LEN = EXTEND_KEYWORD.length;

module.exports = function extractExtends(css) {
  var extensions = {};

  var result;
  while ((result = regex.exec(css)) !== null) {
    var extendee = result[1];
    var extended = result[2];
    
    var replaced = css.replace(EXTEND_KEYWORD, '').replace(extended, '');
    var replacedLen = extended.length + EXTEND_KEYWORD_LEN;
    regex.lastIndex -= replacedLen
    css = replaced;

    extensions[extendee.trim()] = splitter(extended);
  }

  // all extensions have been now replaced
  return {
    css: css,
    extensions: extensions
  }
}

function splitter(match) {
  return match.split(',').map(str => str.trim());
}
