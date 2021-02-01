import _ from 'lodash';

// eslint-disable-next-line no-nested-ternary
const displayValue = (value) => (_.isObject(value)
  ? '[complex value]'
  : (typeof value === 'string'
    ? `'${value}'`
    : value));

const createString = ({
  key,
  value,
  newValue,
  status,
}, path = null) => {
  const newPath = (path === null)
    ? key
    : `${path}.${key}`;
  switch (status) {
    case ('ADDED'):
      return `Property '${newPath}' was added with value: ${displayValue(value)}`;
    case ('REMOVED'):
      return `Property '${newPath}' was removed`;
    case ('CHANGED'):
      return `Property '${newPath}' was updated. From ${displayValue(value)} to ${displayValue(newValue)}`;
    case ('EQUAL'):
      break;
    case ('OBJECT'):
      return value
        .map((item) => (createString(item, newPath)))
        .filter((item) => !!item)
        .join('\n');
    default:
      throw new Error('plain output is failed');
  }
  return null;
};

const plain = (diff) => (diff).map((item) => createString(item)).join('\n');

export default plain;
