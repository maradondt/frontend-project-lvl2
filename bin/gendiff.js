#!/usr/bin/env node
import program from 'commander';
// import fs from 'fs';
// import { resolve } from 'path';
import gendiff from '../src/index.js';

// const getFilePath = (filename) => resolve(process.cwd(), filename);
// const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2)));

program.parse();
