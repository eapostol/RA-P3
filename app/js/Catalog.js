export default class Catalog{
  constructor(){
    this.carousel = document.getElementsByClassName("main-carousel");
    }
  initFlickity(){
  var Flickity = require('flickity');
  var elem = document.querySelector('.main-carousel');
  var flkty = new Flickity( elem, {
    // options
    cellAlign: 'left',
    contain: true
  });
  // element argument can be a selector string
  //   for an individual element
  var flkty = new Flickity( '.main-carousel', {
    // options
  });
  }  

  clickQuickView(theApp,products){
    return function(e){
      let theSku = e.target.getAttribute("data-sku");
      theApp.shoppingCart.quickViewItems(theSku,theApp.products,theApp);
    }
  }

  onClickCartButton(theApp){
    return function(e){
      console.log('activate' + this);
      let theSku = e.target.getAttribute("data-sku");
      theApp.shoppingCart.addItemToCart(theSku);
		}
	}

  addProductsToCarousel(products,theApp){
		this.theApp = theApp;
    let output = "";
    let count = 0;
		if (products === undefined || products == null){
      return ; // do not do anything! there is no data
    }

    for (var i=0; i<products.length; i++){
      count = count+1;
      output += '<div class="carousel-cell margin-hor10 flex flex-col flex-center-a flex-between">';
      output += '<img src="' + products[i].largeFrontImage + '" class="imageProduct margin-10">';
      output += '<p class="">' + products[i].class + '</p>';
      output += '<h3 class="">' + products[i].screenSizeIn + '" ' + products[i].manufacturer + '</h3>';
      output += '<p class="">$ ' + products[i].regularPrice + '</p>';
      output += '<div class="flex flex-row">';
      output += '<button id="' + products[i].sku + '_q" type="button" class="quickviewButton" data-sku="' + products[i].sku + '">Quick View</button>';
      output += '<button id="' + products[i].sku + '_a" type="button" class="addCartButton" data-sku="' + products[i].sku + '">Add to Cart</button></div></div>';
      }
    document.getElementById("Carousel").innerHTML=output;
    output="";
    
    for (var i=0; i<products.length; i++){
      count = count+1;
      document.getElementById(products[i].sku + "_q").addEventListener('click', this.clickQuickView(this.theApp), false);
      document.getElementById(products[i].sku + "_a").addEventListener('click', this.onClickCartButton(this.theApp), false);
    }
    this.initFlickity();
  }
}