import {classRegex, keyframesRegex} from './regex';

export default function extractExports(css) {
  return {
    css,
    keyframes: getExport(css, keyframesRegex),
    classes: getExport(css, classRegex)
  };
}

function getExport(css, regex) {
  const prop = {};
  let match;
  while((match = regex.exec(css)) !== null) {
    const name = match[2];
    prop[name] = name;
  }
  return prop;
}
