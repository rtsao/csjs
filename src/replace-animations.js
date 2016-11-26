import {ignoreComments} from './regex';

export default function replaceAnimations(result) {
  const animations = Object.keys(result.keyframes).reduce((acc, key) => {
    acc[result.keyframes[key]] = key;
    return acc;
  }, {});
  const unscoped = Object.keys(animations);

  if (unscoped.length) {
    const regexStr = `((?:animation|animation-name)\\s*:[^};]*)(${unscoped.join('|')})([;\\s])${ignoreComments}`;
    const regex = new RegExp(regexStr, 'g');

    const replaced = result.css.replace(regex, (match, preamble, name, ending) => preamble + animations[name] + ending);

    return {
      css: replaced,
      keyframes: result.keyframes,
      classes: result.classes
    }
  }

  return result;
}
