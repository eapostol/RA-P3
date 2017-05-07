require('./main.scss');
var JQuery = require('./js/jquery');
var indexer = require('file-loader?name=../dist/index.html!./index.html');


import App from './App';
let app = new App();


// element argument can be a selector string
//   for an individual element
