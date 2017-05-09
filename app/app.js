import BestBuyAjax from './js/BestBuyAjax';
import Catalog from './js/Catalog';
import ShoppingCart from './js/ShoppingCart'

export default class App{
	constructor(){
    this.productData = null;
    this.products = null;
    this.catalog = new Catalog();
    this.shoppingCart = new ShoppingCart();
	  this.initBBAjax();

    this.cartIcon = document.getElementById("cartIcon");
    this.cartIcon.addEventListener("click",(e) => {this.shoppingCart.createCartView(this)},false);
     
    this.clear = document.getElementById("clear");
    this.clear.addEventListener("click",(e) => {this.shoppingCart.clearCart(this)},false);

    this.checkout = document.getElementById("check");
    this.checkout.addEventListener("click",(e) => {this.shoppingCart.checkOut(this)},false);
	}

	initBBAjax(){
    this.bbaj = new BestBuyAjax();
    this.bbaj.apiKey = "8ccddf4rtjz5k5btqam84qak";
    this.bbaj.url = `https://api.bestbuy.com/v1/products(bestSellingRank>10&(categoryPath.id=abcat0502000))?apiKey=${this.bbaj.apiKey}&format=json`;
    this.bbaj.ajaxCall(this); 
	}
	checkProduct(){
    if(this.productData!=null){
        this.products = this.bbaj.getProducts();
    }
    this.showCatalog();
  }
  showCatalog() {
    if (this.productData != null) {
        this.catalog.addProductsToCarousel(this.products,this);
    }
  }
}
