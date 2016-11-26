import {makeComposition} from './composition';

const regex = /\.([^\s]+)(\s+)(extends\s+)(\.[^{]+)/g;

export default function extractExtends(css) {
  let found;
  const matches = [];
  while (found = regex.exec(css)) {
    matches.unshift(found);
  }

  function extractCompositions(acc, match) {
    const extendee = getClassName(match[1]);
    const keyword = match[3];
    const extended = match[4];

    // remove from output css
    const index = match.index + match[1].length + match[2].length;
    const len = keyword.length + extended.length;
    acc.css = `${acc.css.slice(0, index)} ${acc.css.slice(index + len + 1)}`;

    const extendedClasses = splitter(extended);

    extendedClasses.forEach(className => {
      if (!acc.compositions[extendee]) {
        acc.compositions[extendee] = {};
      }
      if (!acc.compositions[className]) {
        acc.compositions[className] = {};
      }
      acc.compositions[extendee][className] = acc.compositions[className];
    });
    return acc;
  }

  return matches.reduce(extractCompositions, {
    css,
    compositions: {}
  });
};

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  const trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}
