Simple web-scraping and module packaging demo. Generates a table of contents by spidering from a given URL.

## Usage

### As a command line tool

```
npm install autotoc
autotoc http://hgc.io
```

### As a library

```
const autotoc = require('autotoc');
autotoc('http://hgc.io').then(autotoc.consolePrinter, err => console.log(err));
```

## Development

```
git clone
cd autotoc
npm install
```

To regenerate the client-side [UMD](https://github.com/umdjs/umd) version:

```
npm install -g browserify
browserify autotoc.js -s autotoc -o browser/scripts/autotoc.js
```