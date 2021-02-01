import parsers from './parsers.js';
import createDiff from './creatediff.js';
import format from './formatters/index.js';

const gendiff = (pathToFile1, pathToFile2, formatName = 'stylish') => {
  const file1 = parsers(pathToFile1);
  const file2 = parsers(pathToFile2);
  const diff = createDiff(file1, file2);
  return format(diff, formatName);
};

export default gendiff;
