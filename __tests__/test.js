// import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let pathToFile1;
let pathToFile2;

beforeAll(() => {
  pathToFile1 = getFixturePath('file1.json');
  pathToFile2 = getFixturePath('file2.json');
});

test('step 1, simple tree', () => {
  expect(gendiff(pathToFile1, pathToFile2)).toBe(`
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
