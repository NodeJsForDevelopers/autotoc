requirejs.config({
    paths: {
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min'
    }
});

require(['autotoc', 'jquery'], function(autotoc, $) {
    'use strict';
    autotoc('http://hgc.io').then(toc => {
        let printEntry = function(entry, parent) {
            let list = $(document.createElement('ul'));
            list.append(`<li><a href="${entry.url}">${entry.name}</a></li>`);
            entry.children.forEach(childEntry => {
                printEntry(childEntry, list);
            })
            parent.append(list);
        }
        
        printEntry(toc, $('body'));
    }, err => console.log(err));
});