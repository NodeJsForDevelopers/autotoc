'use strict';

const autotoc = require('./autotoc.js');
const consolePrinter = require('./consolePrinter.js');

if (require.main === module) {
    autotoc(process.argv[2]).then(consolePrinter, err => console.log(err));
} else {
    module.exports = autotoc;
    module.exports.consolePrinter = consolePrinter;
}