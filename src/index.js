import parsers from './parsers.js';
import createDiff from './creatediff.js';
import stylish from './formaters/stylish.js';

const dispatchMod = {
  stylish: (diff) => stylish(diff),
};

const gendiff = (pathToFile1, pathToFile2, mod = 'stylish') => {
  const file1 = parsers(pathToFile1);
  const file2 = parsers(pathToFile2);
  const diff = createDiff(file1, file2);
  return dispatchMod[mod](diff);
};

export default gendiff;
