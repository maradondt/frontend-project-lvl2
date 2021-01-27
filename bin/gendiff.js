#!/usr/bin/env node
import program from 'commander';
// import fs from 'fs';
// console.log(JSON.parse(fs.readFileSync('frontend-project-lvl2/package.json')).version);

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

program.parse();
