import BestBuyAjax from './js/BestBuyAjax';


export default class App{
	constructor(){
		this.initBBAjax();
		}
	initBBAjax(){
	    this.bbaj = new BestBuyAjax();
	    this.bbaj.apiKey = "8ccddf4rtjz5k5btqam84qak";
	    this.bbaj.url = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=${this.bbaj.apiKey}&format=json`;
	    this.bbaj.ajaxCall(this); 
	}
	checkProduct(){
        if(this.productData!=null){
            this.products = this.bbaj.getProducts();
        }
        //this.showCatalog();
    }
    showCatalog() {
        if (this.productData != null) {
            this.catalogView.addProductsToCarousel(this.products,this);
            // this.catalogView.showCatalog();
        }
    }
}
