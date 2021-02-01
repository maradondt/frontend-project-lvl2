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

const getPrevVal = ({ value, childrens }) => (childrens
  ? { oldChildrens: childrens }
  : { oldValue: value });

const displayProps = (key, value, status) => {
  if (_.isObject(value)) {
    return {
      status,
      key,
      value: 'nested',
      childrens: Object.entries(value).map(([k, v]) => displayProps(k, v, status)),
    };
  }
  return { key, value, status };
};

const createDiff = (file1, file2 = {}) => {
  const allKeys = _.sortBy(unionKeys(file1, file2));

  const result = _.uniq(allKeys).map((key) => {
    if (isRemoved(file1, file2, key)) {
      return { ...displayProps(key, file1[key], 'REMOVED') };
    }
    if (isAdded(file1, file2, key)) {
      return { ...displayProps(key, file2[key], 'ADDED') };
    }
    if (isEqual(file1, file2, key)
        && isNotObject(file1[key])
        && isNotObject(file2[key])) {
      return { ...displayProps(key, file1[key], 'EQUAL') };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { ...displayProps(key, 'nested', 'UPDATED'), childrens: createDiff(file1[key], file2[key]) };
    }

    const preValue = getPrevVal(displayProps(key, file1[key], 'CHANGED'));

    return { ...displayProps(key, file2[key], 'CHANGED'), ...preValue };
  });
  return result;
};

export default createDiff;
