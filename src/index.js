import _ from 'lodash';
import parsers from './parsers.js';

const createDiff = (file1, file2) => {
  const allKeys = Object.keys(file1)
    .concat(Object.keys(file2))
    .sort((a, b) => a.localeCompare(b));

  const result = _.uniq(allKeys).map((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { state: 'REMOVED', key, value: file1[key] };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { state: 'ADDED', key, value: file2[key] };
    }
    if (file1[key] === file2[key]) {
      return { state: 'EQUAL', key, value: file1[key] };
    }
    return {
      state: 'CHANGED',
      key,
      value: file1[key],
      newValue: file2[key],
    };
  });
  return result;
};

const createOutput = (arr) => {
  const sep = '  ';
  const dispatch = {
    EQUAL: (obj, separator) => `${separator}${separator}${obj.key}: ${obj.value}`,
    REMOVED: (obj, separator) => `${separator}- ${obj.key}: ${obj.value}`,
    ADDED: (obj, separator) => `${separator}+ ${obj.key}: ${obj.value}`,
    CHANGED: (obj, separator) => `${separator}- ${obj.key}: ${obj.value}\n${separator}+ ${obj.key}: ${obj.newValue}`,
  };

  return `\n{\n${arr
    .map((item) => dispatch[item.state](item, sep))
    .join('\n')}\n}`;
};
const gendiff = (pathToFile1, pathToFile2) => {
  const file1 = parsers(pathToFile1);
  const file2 = parsers(pathToFile2);
  const arrDifs = createDiff(file1, file2);
  return createOutput(arrDifs);
};

export default gendiff;
