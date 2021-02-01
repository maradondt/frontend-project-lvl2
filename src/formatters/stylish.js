// import _ from 'lodash';

const displayChildrens = (childrens, sep, depth) => `{\n${childrens
  .map(({ key, value, childrens: childs }) => (childs
    ? `${sep.repeat(depth + 1)}${key}: ${displayChildrens(childs, sep, depth + 1)}`
    : `${sep.repeat(depth + 1)}${key}: ${value}`))
  .join('\n')}\n${sep.repeat(depth)}}`;

const createString = ({
  status,
  key,
  value,
  oldValue,
  childrens,
  oldChildrens,
}, sep, depth) => {
  const currentValue = childrens
    ? displayChildrens(childrens, sep, depth + 1)
    : value;
  const oldCurrentValue = oldChildrens
    ? displayChildrens(oldChildrens, sep, depth + 1)
    : oldValue;
  switch (status) {
    case 'EQUAL':
      return `${sep.repeat(depth + 1)}${key}: ${currentValue}`;
    case 'ADDED':
      return `${sep.repeat(depth)}  + ${key}: ${currentValue}`;
    case 'REMOVED':
      return `${sep.repeat(depth)}  - ${key}: ${currentValue}`;
    case 'CHANGED':
      return `${sep.repeat(depth)}  - ${key}: ${oldCurrentValue}\n${sep.repeat(depth)}  + ${key}: ${currentValue}`;
    case 'UPDATED':
      return `${sep.repeat(depth + 1)}${key}: {\n${childrens
        .map((item) => createString(item, sep, depth + 1))
        .join('\n')}\n${sep.repeat(depth + 1)}}`;
    default: throw new Error('Creating string is failed');
  }
};
const stylish = (diff, d = 0) => `{\n${diff
  .map((item) => createString(item, '    ', d))
  .join('\n')}\n}`;

export default stylish;
