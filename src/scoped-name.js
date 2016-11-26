import encode from './hash-utils/base62-encode';
import hash from './hash-utils/hash-string';

export default function fileScoper(fileSrc) {
  const suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return `${name}_${suffix}`;
  }
};
