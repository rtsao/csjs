import encode from './base62-encode';
import hash from './hash-string';

export default function fileScoper(fileSrc) {
  const suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return `${name}_${suffix}`;
  }
};
