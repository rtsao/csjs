'use strict';

/**
 * Shallowly merges each argument's properties into a new object
 * Does not modify source objects and does not check if hasOwnProperty
 * @param {...object} - the objects to be merged
 * @returns {object}  - the new object
 */
module.exports = function mergeProperties() {
  var target = {};

  var i = arguments.length;
  while (i--) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }

  return target;
};
