(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['superagent', 'jQuery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('superagent'), require('cheerio').load, require('url').resolve);
    } else {
        root.returnExports = factory(root.b);
    }
}(this, function factory(superagent, loadHtml, resolveUrl) {
    'use strict';
    
    function getHtml(url) {
        return new Promise((resolve, reject) => {
            superagent.get(url).end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(loadHtml(res.text));
                }
            })
        })
    }
    
    class Node {
        constructor(name, url) {
            this.name = name;
            this.url = url;
            this.children = [];
        }
        
        spider() {
            return getHtml(this.url)
                .then($ => {
                    let promiseChildren = [];
                    $('a').each((i, elem) => {
                        let name = $(elem).text(), url = $(elem).attr('href');
                        if (name && url) {
                            let absoluteUrl = resolveUrl(this.url, url);
                            if (absoluteUrl.indexOf(this.url) === 0 && absoluteUrl !== this.url && absoluteUrl != this.url + '/') {
                                let childNode = new Node(name.trim(), absoluteUrl);
                                if (absoluteUrl.indexOf('#') === -1) {
                                    promiseChildren.push(childNode.spider());
                                } else {
                                    promiseChildren.push(Promise.resolve(childNode));
                                }
                            }
                        }
                    });
                    return Promise.all(promiseChildren).then(children => {
                        this.children = children;
                        return this;
                    });
                });
        }
    }
    
    return baseUrl => new Node('Home', baseUrl).spider();
}));