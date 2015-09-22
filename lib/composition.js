'use strict';

module.exports = {
  makeComposition: makeComposition,
  definition: Composition
};

function Composition() {}

function makeComposition(classNames) {
  return Object.create(Composition.prototype, {
    classNames: {
      value: Object.freeze(classNames),
      configurable: false,
      writable: false,
      enumerable: true
    },
    className: {
      value: classNames.join(' '),
      configurable: false,
      writable: false,
      enumerable: true
    },
    selector: {
      value: classNames.map(name => '.' + name).join(', '),
      configurable: false,
      writable: false,
      enumerable: true
    }
  });
}
