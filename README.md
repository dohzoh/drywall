Drywall DynamoDB
=============

A website and user system for Node.js. What you create with Drywall is more important than Drywall. [See a bird's eye view.](http://jedireza.github.io/drywall/)

[![Dependency Status](https://david-dm.org/jedireza/drywall.png)](https://david-dm.org/jedireza/drywall)
[![devDependency Status](https://david-dm.org/jedireza/drywall/dev-status.png)](https://david-dm.org/jedireza/drywall#info=devDependencies)

Technology
------------

| On The Server | On The Client  | Development |
| ------------- | -------------- | ----------- |
| Express       | Bootstrap      | Grunt       |
| Jade          | Backbone.js    | Bower       |
| EmailJS        | jQuery         |             |
| Passport      | Underscore.js  |             |
| Async         | Font-Awesome   |             |
| Amazon SDK       | Moment.js      |             |
| Vogels       |       |             |
| Connect-DynamoDB       |       |             |


Requirements
------------

You need [Node.js](http://nodejs.org/download/) and Amazon DynamoDB installed and running.

We use [Grunt](http://gruntjs.com/) as our task runner. Get the CLI (command line interface).

```bash
$ npm install grunt-cli -g
```

We use [Bower](http://bower.io/) as our front-end package manager. Get the CLI (command line interface).

```bash
$ npm install bower -g
```


Installation
------------

```bash
$ git clone https://github.com/dohzoh/drywall.git && cd ./drywall && git checkout dynamodb
$ npm install && bower install
$ mv ./config.example.js ./config.js
$ mv ./credentials.example.js ./credentials.js   # and put your amazon accesskey
$ grunt
```

License
------------

MIT

License

The MIT License (MIT)

Copyright (c) 2014 dozo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
