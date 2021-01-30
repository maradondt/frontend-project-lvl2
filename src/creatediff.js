import _ from 'lodash';
import predicates from './predicates.js';

const {
  isAdded,
  isRemoved,
  isEqual,
  isNotObject,
} = predicates;

const unionKeys = (obj1, obj2) => Object.keys(obj1)
  .concat(Object.keys(obj2));

const createDiff = (file1, file2 = {}) => {
  const allKeys = unionKeys(file1, file2)
    .sort((a, b) => a.localeCompare(b));

  const result = _.uniq(allKeys).map((key) => {
    if (isRemoved(file1, file2, key)) {
      return {
        status: 'REMOVED',
        key,
        value: file1[key],
      };
    }
    if (isAdded(file1, file2, key)) {
      return {
        status: 'ADDED',
        key,
        value: file2[key],
      };
    }
    if (isEqual(file1, file2, key)
        && isNotObject(file1[key])
        && isNotObject(file2[key])) {
      return { status: 'EQUAL', key, value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { status: 'OBJECT', key, value: createDiff(file1[key], file2[key]) };
    }
    return {
      status: 'CHANGED',
      key,
      value: file1[key],
      newValue: file2[key],
    };
  });
  return result;
};

export default createDiff;
