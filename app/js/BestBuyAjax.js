export default class BestBuyAjax{
    constructor(){
        this.url ="";
        this.apiKey = "";
        this.productData = null;
        this.products = null;
    }

    ajaxCall(theApp){
        console.log('getData');
        let serviceChannel = new XMLHttpRequest();
        let url = this.url;
        console.log(url);
        serviceChannel.addEventListener("readystatechange",this.recieveCheck(theApp),false);
        serviceChannel.open("GET",url,true);
        serviceChannel.send();
    }

    recieveCheck(theApp){
        console.log('RecieveCheck');
        let thisService = this;
        let eventHandler = function(event){
            thisService.checkResult(event,theApp)
        };
        return eventHandler
    };

    checkResult(event,theApp){
        console.log('Result');
        if (event.target.readyState == 4 && event.target.status == 200){
            this.productData = event.target.responseText;
            theApp.productData = event.target.responseText;
            console.log(event.target.status);
            theApp.checkProduct();
        }
    }

    getProducts(){
        console.log('GetProducts');
        if(this.productData!=null){
           let jsonData = JSON.parse(this.productData);
           this.products = jsonData.products;
           console.log(this.products);
           return this.products;
        }
        return;
    }
}