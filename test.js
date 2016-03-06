'use strict';

let autotoc = require('./autotoc.js');
autotoc('http://hgc.io').then(toc => {
    let printNode = function(node, indent) {
        console.log(`${indent} - ${node.name} (${node.url})`);
        node.children.forEach(childNode => {
            printNode(childNode, indent + '  ');
        })
    }
    
    printNode(toc, '');
}, err => console.log(err));