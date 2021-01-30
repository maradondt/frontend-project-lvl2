import _ from 'lodash';

const displayObject = (obj, sep, depth) => `{\n${Object.entries(obj)
  .map(([key, value]) => (_.isObject(value)
    ? `${sep.repeat(depth + 1)}${key}: ${displayObject(value, sep, depth + 1)}`
    : `${sep.repeat(depth + 1)}${key}: ${value}`))
  .join('\n')}\n${sep.repeat(depth)}}`;

const stylish = (diff, d = 0) => {
  const separator = '    ';
  const createString = ({
    status,
    key,
    value,
    newValue,
  }, sep, depth) => {
    const currentValue = _.isObject(value)
      ? displayObject(value, sep, depth + 1)
      : value;
    const newCurrentValue = _.isObject(newValue)
      ? displayObject(newValue, sep, depth + 1)
      : newValue;

    switch (status) {
      case 'EQUAL':
        return `${sep.repeat(depth + 1)}${key}: ${currentValue}`;
      case 'ADDED':
        return `${sep.repeat(depth)}  + ${key}: ${currentValue}`;
      case 'REMOVED':
        return `${sep.repeat(depth)}  - ${key}: ${currentValue}`;
      case 'CHANGED':
        return `${sep.repeat(depth)}  - ${key}: ${currentValue}\n${sep.repeat(depth)}  + ${key}: ${newCurrentValue}`;
      case 'OBJECT':
        return `${sep.repeat(depth + 1)}${key}: {\n${value
          .map((item) => createString(item, sep, depth + 1))
          .join('\n')}\n${sep.repeat(depth + 1)}}`;
      default: throw new Error('Creating string is failed');
    }
  };
  return `{\n${diff
    .map((item) => createString(item, separator, d))
    .join('\n')}\n}`;
};

export default stylish;
