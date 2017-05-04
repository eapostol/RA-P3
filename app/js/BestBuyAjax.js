export default class BestBuyAjax {
    constructor(){
        console.log('Startng Best Buy Ajax Call');
    }
}

  			this.url ="";
        this.apiKey = "";
        this.productData = null;
        this.products = null;
    }

    getData(theApp){
        let serviceChannel = new XMLHttpRequest();
        let url = this.url;
        console.log(url);
        serviceChannel.addEventListener("readystatechange",this.resultsPreprocessor(theApp),false);
        serviceChannel.open("GET",url,true);
        serviceChannel.send();
    }

    getProducts(){
        if(this.productData!=null){
           let jsonData = JSON.parse(this.productData);
           this.products = jsonData.products;
           return this.products;
        }

        return; // if we have no data, return nothing
    }
}