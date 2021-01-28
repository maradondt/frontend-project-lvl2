import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFilePath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

const parsers = (filename) => {
  const extName = path.extname(filename);
  switch (extName) {
    case '.json':
      return JSON.parse(readFile(filename));
    case '.yml':
      return yaml.load(readFile(filename));
    default:
      throw new Error('Unknow file extension');
  }
};

export default parsers;
