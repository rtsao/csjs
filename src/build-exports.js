import {makeComposition} from './composition';

export default function createExports(classes, keyframes, compositions) {
  const keyframesObj = Object.keys(keyframes).reduce((acc, key) => {
    const val = keyframes[key];
    acc[val] = makeComposition([key], [val], true);
    return acc;
  }, {});

  const exports = Object.keys(classes).reduce((acc, key) => {
    const val = classes[key];
    const composition = compositions[key];
    const extended = composition ? getClassChain(composition) : [];
    const allClasses = [key].concat(extended);
    const unscoped = allClasses.map(name => classes[name] ? classes[name] : name);
    acc[val] = makeComposition(allClasses, unscoped);
    return acc;
  }, keyframesObj);

  return exports;
};

function getClassChain(obj) {
  const visited = {};
  const acc = [];

  function traverse(obj) {
    return Object.keys(obj).forEach(key => {
      if (!visited[key]) {
        visited[key] = true;
        acc.push(key);
        traverse(obj[key]);
      }
    });
  }

  traverse(obj);
  return acc;
}
