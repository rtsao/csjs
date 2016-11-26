const findClasses = /(\.)(?!\d)([^\s\.,{\[>+~#:)]*)(?![^{]*})/.source;
const findKeyframes = /(@\S*keyframes\s*)([^{\s]*)/.source;

export const ignoreComments = /(?!(?:[^*/]|\*[^/]|\/[^*])*\*+\/)/.source;

export const classRegex = new RegExp(findClasses + ignoreComments, 'g');
export const keyframesRegex = new RegExp(findKeyframes + ignoreComments, 'g');
