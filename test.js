'use strict';

let autotoc = require('./autotoc.js');
autotoc('http://hgc.io').then(toc => {
    let printEntry = function(entry, indent) {
        console.log(`${indent} - ${entry.name} (${entry.url})`);
        entry.children.forEach(childEntry => {
            printEntry(childEntry, indent + '  ');
        })
    }
    
    printEntry(toc, '');
}, err => console.log(err));