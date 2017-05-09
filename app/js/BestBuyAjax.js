export default class BestBuyAjax{
    constructor(){
        this.url ="";
        this.apiKey = "";
        this.productData = null;
        this.products = null;
    }

    ajaxCall(theApp){
        let serviceChannel = new XMLHttpRequest();
        let url = this.url;
        serviceChannel.addEventListener("readystatechange",this.recieveCheck(theApp),false);
        serviceChannel.open("GET",url,true);
        serviceChannel.send();
    }
    recieveCheck(theApp){
        let thisService = this;
        let eventHandler = function(event){
            thisService.checkResult(event,theApp)
        };
        return eventHandler
    };
    checkResult(event,theApp){
        if (event.target.readyState == 4 && event.target.status == 200){
            this.productData = event.target.responseText;
            theApp.productData = event.target.responseText;
            theApp.checkProduct();
        }
    }
    getProducts(){
        if(this.productData!=null){
           let jsonData = JSON.parse(this.productData);
           this.products = jsonData.products;
           return this.products;
        }
        return;
    }
}