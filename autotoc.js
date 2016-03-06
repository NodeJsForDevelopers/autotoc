(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('jquery-detached', ['jquery'], function($) {
            return html => {
                let jqObj = $($.parseHTML(html));
                return jqObj.find.bind(jqObj);
            }
        });
        
        define(['superagent', 'urijs/URI', 'jquery-detached'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('superagent'), require('urijs'), require('cheerio').load);
    } else {
        root.returnExports = factory(root.b);
    }
}(this, function factory(superagent, URI, loadHtml) {
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
                            let absoluteUrl = new URI(url).absoluteTo(this.url).toString();
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