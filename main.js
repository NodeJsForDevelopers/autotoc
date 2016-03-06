requirejs.config({
    paths: {
        superagent: 'https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min',
        urijs: 'https://cdnjs.cloudflare.com/ajax/libs/URI.js/1.17.1',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min'
    }
});

requirejs(["autotoc"], function(autotoc) {
    'use strict';
    autotoc('http://hgc.io').then(toc => {
        let printNode = function(node, indent) {
            console.log(`${indent} - ${node.name} (${node.url})`);
            node.children.forEach(childNode => {
                printNode(childNode, indent + '  ');
            })
        }
        
        printNode(toc, '');
    }, err => console.log(err));
});