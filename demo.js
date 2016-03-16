'use strict';

const autotoc = require('./autotoc.js');
const consolePrinter = require('./consolePrinter.js');

autotoc('http://hgc.io').then(consolePrinter, err => console.log(err));