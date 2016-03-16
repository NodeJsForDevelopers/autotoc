'use strict';

const cheerio = require('cheerio');
const request = require('denodeify')(require('request'));
const url = require('url');

class Page {
  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.children = [];
  }
  
  spider() {
    return request(this.url)
      .then(response => {
        let $ = cheerio.load(response.body);
        let promiseChildren = [];
        $('a').each((i, elem) => {
          let name = $(elem).contents().get(0).nodeValue;
          let childUrl = $(elem).attr('href');
          if (name && childUrl && childUrl !== '/') {
            let absoluteUrl = url.resolve(this.url, childUrl);
            if (absoluteUrl.indexOf(this.url) === 0 && absoluteUrl !== this.url) {
              let childPage = new Page(name.trim(), absoluteUrl);
              if (childUrl.indexOf('#') === 0) {
                promiseChildren.push(Promise.resolve(childPage));
              } else {
                promiseChildren.push(childPage.spider());
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

module.exports = baseUrl => new Page('Home', baseUrl).spider();