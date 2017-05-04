require('./main.scss');
console.log("SASS run finish");
var Flickity = require('flickity');
//var flkty = new Flickity( '.', {});
//import JQjs from './js/jquery-3.2.1.min';
//let JQjsX= new JQjs();
//import MainFn from './js/MainFn';
//let MainFnX= new MainFn();

var indexer = require('file-loader?name=../dist/index.html!./index.html');
console.log("Copied index.html");

import App from './App';
let app = new App();
console.log(app);
// element argument can be a selector string
//   for an individual element
