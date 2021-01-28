// import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let pathToJsonFile1;
let pathToJsonFile2;

let pathToYmlFile1;
let pathToYmlFile2;

beforeAll(() => {
  pathToJsonFile1 = getFixturePath('file1.json');
  pathToJsonFile2 = getFixturePath('file2.json');

  pathToYmlFile1 = getFixturePath('file1.yml');
  pathToYmlFile2 = getFixturePath('file2.yml');
});

test('step 1, simple tree, json', () => {
  expect(gendiff(pathToJsonFile1, pathToJsonFile2)).toBe(`
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
test('step 2, simple tree, yml', () => {
  expect(gendiff(pathToYmlFile1, pathToYmlFile2)).toBe(`
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
