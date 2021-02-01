// eslint-disable-next-line no-nested-ternary
const displayValue = (value) => (typeof value === 'string'
  ? `'${value}'`
  : value);

const createString = ({
  key,
  value,
  oldValue,
  status,
  childrens,
  oldChildrens,
}, path = null) => {
  const newPath = (path === null)
    ? key
    : `${path}.${key}`;
  const currentValue = childrens
    ? '[complex value]'
    : displayValue(value);
  const currentOldValue = oldChildrens
    ? '[complex value]'
    : displayValue(oldValue);
  switch (status) {
    case ('ADDED'):
      return `Property '${newPath}' was added with value: ${currentValue}`;
    case ('REMOVED'):
      return `Property '${newPath}' was removed`;
    case ('CHANGED'):
      return `Property '${newPath}' was updated. From ${currentOldValue} to ${currentValue}`;
    case ('EQUAL'):
      break;
    case ('UPDATED'):
      return childrens
        .map((child) => (createString(child, newPath)))
        .filter((child) => !!child)
        .join('\n');
    default:
      throw new Error('plain output is failed');
  }
  return null;
};

const plain = (diff) => (diff).map((item) => createString(item)).join('\n');

export default plain;
