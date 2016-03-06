'use strict';

let spider = require('./index.js');
spider('http://hgc.io').then(tree => {
    let printNode = function(node, indent) {
        console.log(`${indent} - ${node.name} (${node.url})`);
        node.children.forEach(childNode => {
            printNode(childNode, indent + '  ');
        })
    }
    
    printNode(tree, '');
}, err => console.log(err));