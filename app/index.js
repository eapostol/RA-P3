/**
 * Created by Edward_J_Apostol on 2017-04-28.
 */

// strange, this is how webpack currently works with sass to import stylesheets
require('./main.scss');
console.log("SASS run finish");
//require('./app.js');
//console.log("JS run finish");

// this ensures that index.html is updated with webpack
var indexer = require('file-loader?name=../dist/index.html!./index.html');
console.log("Copied index.html");

/*
import App from './App';

let app = new App();
console.log(app);
*/
console.log("reading index.js complete...");