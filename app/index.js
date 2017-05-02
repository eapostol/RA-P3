/**
 * Created by Edward_J_Apostol on 2017-04-28.
 */

// strange, this is how webpack currently works with sass to import stylesheets
require('./reset.scss');
//require('./flickity.scss');
require('./main.scss');
console.log("implemented sasser");

// this ensures that index.html is updated with webpack
var indexer = require('file-loader?name=../dist/index.html!./index.html');
console.log("copied index.html");

import App from './App';
//import Flickity from './Flickity';

let app = new App();
console.log(app);
//let flickity = new Flickity();
//console.log(flickity);

console.log("reading index.js complete...");