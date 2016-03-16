'use strict';

const printEntry = function(entry, indent) {
        console.log(`${indent} - ${entry.name} (${entry.url})`);
        entry.children.forEach(childEntry => {
            printEntry(childEntry, indent + '  ');
        })
    }
    
module.exports = toc => printEntry(toc, '');