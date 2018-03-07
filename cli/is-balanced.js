#!/usr/bin/env node

const isBalanced = require('../src/isBalanced');

const str = process.argv[2] || '';
const timerArg = parseInt(process.argv[3] || '1000');
const renderMode = process.argv.includes('-p');

let timer = timerArg || 1000;

const returnValue = isBalanced(str, renderMode, timer);

console.log(returnValue);