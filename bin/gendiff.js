#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish');

program.parse(process.argv);
const options = program.opts();
console.log(gendiff(...program.args, options.format));
