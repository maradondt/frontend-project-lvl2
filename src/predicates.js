import _ from 'lodash';

const predicates = {
  isAdded: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
  isRemoved: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
  isEqual: (obj1, obj2, key) => obj1[key] === obj2[key],
  isNotObject: (obj) => !_.isObject(obj),
};

export default predicates;
