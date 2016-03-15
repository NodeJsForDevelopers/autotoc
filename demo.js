'use strict';

const autotoc = require('.');

autotoc('http://hgc.io').then(autotoc.consolePrinter, err => console.log(err));