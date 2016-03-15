#! /usr/bin/env node

'use strict';

const autotoc = require('./autotoc.js');
const consolePrinter = require('./consolePrinter.js');

autotoc(process.argv[2]).then(consolePrinter, err => console.log(err));