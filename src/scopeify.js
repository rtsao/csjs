import fileScoper from './scoped-name';
import replaceAnimations from './replace-animations';
import {classRegex, keyframesRegex} from './regex';

const replacers = {
  classes: classRegex,
  keyframes: keyframesRegex
};
const replacerKeys = Object.keys(replacers);

export default function scopify(css, ignores) {
  const makeScopedName = fileScoper(css);

  function scopeCss(result, key) {
    const replacer = replacers[key];
    function replaceFn(fullMatch, prefix, name) {
      const scopedName = ignores[name] ? name : makeScopedName(name);
      result[key][scopedName] = name;
      return prefix + scopedName;
    }
    return {
      css: result.css.replace(replacer, replaceFn),
      keyframes: result.keyframes,
      classes: result.classes
    };
  }

  const result = replacerKeys.reduce(scopeCss, {
    css,
    keyframes: {},
    classes: {}
  });

  return replaceAnimations(result);
}
