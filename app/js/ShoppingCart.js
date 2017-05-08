let $ = require('jquery');

export default class ShoppingCart{
  constructor(){
    this.viewcart = document.getElementsByClassName("viewCart");
    this.quickview = document.getElementById("quickViewWindow");//target popup window
    this.getCartTotal();
  }

  addItemToCart(sku){
    //session storage//
    if (typeof(Storage) !== "undefined") {
			if (sessionStorage.getItem(sku.toString()) !== null){
        let currentValue = sessionStorage.getItem(sku);
        currentValue = parseInt(currentValue);
        currentValue = currentValue + 1;
        currentValue = currentValue.toString();
        sessionStorage.setItem(sku, currentValue);
        } else {
          console.log("This is a new sku");
          sessionStorage.setItem(sku.toString(),"1");
      }
      } else {
        console.error("Error! SessionStorage not supported in your browser!");
    }     
    if (sessionStorage.getItem("quantity") == undefined){
        sessionStorage.setItem("quantity",1);   
      } else {
        let newQuantity = sessionStorage.getItem("quantity");
        newQuantity = parseInt(newQuantity);
        newQuantity +=1;
        sessionStorage.setItem("quantity",newQuantity);
    }
    this.getCartTotal();
    document.getElementById("cartQty").className = "unhide";
  }

  quickViewItems(sku, products,theApp){
    let output = "";
    document.getElementById("QVcontent").innerHTML = output;
    document.getElementById("quickViewWindow").className = "modal unhide";

    for(let i=0; i<products.length; i++){
      let product = products[i];
    	if (product.sku.toString() == sku.toString() ){
				output += '<div class="Item-content flex">';
        output += '<img class="QVimage" src="' + product.image + '">';
        output += '<div class="textcenter">';
        output += '<H3 class="">' + product.manufacturer + '</H3>';
        output += '<p class="">' + product.longDescription + '</p>';
        output += '<p class="">$ '+product.regularPrice+'</p>';
        output += '<button class="addtocart" id="QVAddtoCart" type="button" data-sku="' + product.sku + '">Add to cart</button>';
        output += '</div></div>';
  	    }
  		}
      document.getElementById("closeWindowq").addEventListener("click", (e) => { document.getElementById("quickViewWindow").className = "modal hide";},false);
      document.getElementById("quickViewWindow").className = "modal unhide";
      document.getElementById("QVcontent").innerHTML = output;
    //output="";
  	document.getElementById("QVAddtoCart").addEventListener("click",theApp.catalog.onClickCartButton(theApp),false);
	}

  getCartTotal(){
    if (sessionStorage.getItem('quantity') !== 'undefined') {
      document.getElementById("cartQty").className = 'unhide';
      document.getElementById("cartText").className = ' hide';

      let currentVal = sessionStorage.getItem('quantity');
      document.getElementById("cartQty").value=currentVal;

      if (sessionStorage.getItem('quantity') == 'undefined' ){
        document.getElementById("cartQty").className = ' unhide';
        document.getElementById("cartText").className =' hide';
			}
    }
  }

 	createCartView(theApp){
    document.getElementById("viewCart").innerHTML = "";
    document.getElementById('cartItemView').className = "cartcontainer unhide";
    let output = "";

    for (var i = 0; i < sessionStorage.length-1; i++){
      let currentSku = sessionStorage.key(i);
      let currentQty = sessionStorage.getItem(currentSku);
      for (let i=0; i<theApp.products.length; i++){
				if (theApp.products[i].sku.toString() == currentSku ){
          let actualProduct = theApp.products[i];
          let price = actualProduct.regularPrice;
          let subTotal = price * currentQty;

          output += '<div class="CartDiv flex flex-row width-100">';
          output += '<div id="' + actualProduct.sku + '" class="shoppingcart">';
          output += '<img src="'+actualProduct.largeFrontImage+'" class="cartImages"></div>';
          output += '<h3 class="productManufaturer">' + actualProduct.manufacturer + '</h3>';
          output += '<p class="productPrice">' + actualProduct.regularPrice + '</p>';
          output += '<input id="qty_' + actualProduct.sku + '" class="qty" type="number" style="border: 1px solid blue;" data-sku="' + actualProduct.sku + '" value="' + currentQty + '">Quantity';
          output += '<p id="' + subTotal + '" class="">Total $ ' + (currentQty * actualProduct.regularPrice) + '</p>';
          output += '<div class="buttonscart"></div>';
          output += '<button id="removeBtn" class="remove" type="button" data-sku="' + actualProduct.sku + '">Remove</div>';
          output += '<button id="updateBtn" class="update" type="button">Update</div></div></div>';
          document.getElementById("viewCart").innerHTML=output;

          document.getElementById("removeBtn").addEventListener("click",(e) => {this.removeItemFromCart(actualProduct.sku,this)},false);
          document.getElementById("updateBtn").addEventListener("click",(e) => {this.updateQuantityofItemInCart(actualProduct.sku,theApp)},false);     
   			}

        let CartTotal = document.getElementsByClassName("subtotal");

        let Total = parseInt(0);
        for (let i=0; i<CartTotal.length; i++) {
          let subtotals = Number(CartTotal[i].getAttribute('id'));
          Total += subtotals;
        }
        let addTotal = '<p class="">Total Price: $' + Total + '</p>';
        document.getElementsByClassName("totalamount").innerHTML = addTotal;
      }
  	} 

	  //Closes Cart when clear
    document.getElementById("clear").addEventListener('click', function(){
    document.getElementById("cartItemView").className = "cartcontainer hide"}, false);

	  //Close cart when X
    document.getElementById("closeCart").addEventListener('click', function(){
    document.getElementById("cartItemView").className = "cartcontainer hide"}, false);
	}
  deleteItem(sku,thisShoppingCart){
    let skuQty = sessionStorage.getItem(sku);
    let oldQty = sessionStorage.getItem('quantity');
    sessionStorage.removeItem(sku);
    let newQty = parseInt(oldQty)-parseInt(skuQty);
    sessionStorage.setItem('quantity', newQty.toString());
    
  }

  //remove items from cart and session storage
	removeItemFromCart(sku,theApp){
    let skuQty = sessionStorage.getItem(sku);
    console.log(skuQty);

	  $("[data-sku='"+sku+"']").closest(".CartDiv").remove();
			let removedItem = sessionStorage.getItem(sku);
      sessionStorage.removeItem(sku);
      let newQuantity = sessionStorage.getItem("quantity");
      newQuantity = newQuantity - removedItem;

      sessionStorage.setItem("quantity",newQuantity);
      let current_val = sessionStorage.getItem("quantity");

      let CartTotal = document.getElementsByClassName("subtotal");
              
      let Total = parseInt(0);
      for (let i=0;i < CartTotal.length ;i++) {
      	let subtotals = Number(CartTotal[i].getAttribute('id'));
      	Total += subtotals;         
      }
      let addTotal = '<p class="">Total Price: $ ' + Total + '</p>';
      document.getElementById('totalamount').innerHTML=addTotal;
   
    this.getCartTotal();
  }          
  updateQuantityofItemInCart(sku,products){
    for (let p=0; p<sessionStorage.length; p++){
      let currentSku = sessionStorage.key(p);
      let actualqty = sessionStorage.getItem(currentSku);

      if(currentSku !== "quantity"){
        let inputSku = document.getElementById("qty_"+currentSku);
        let inputVal = document.getElementById("qty_"+currentSku).value;

        if(inputVal.toString()!== actualqty.toString()){
          sessionStorage.setItem(currentSku,inputVal);

          let newQuantity = sessionStorage.getItem("quantity");
          newQuantity = parseInt(newQuantity);
          inputVal = parseInt(inputVal);
          actualqty = parseInt(actualqty);
          newQuantity = newQuantity + inputVal - actualqty;
          sessionStorage.setItem("quantity",newQuantity);
          }
        }
      }  
    this.createCartView();
    this.getCartTotal();
    document.getElementById("overlay").className='hide';       
    }

  checkOut(){
    //document.getElementById('payForm').className += ' unhide';
    console.log('Active Payment');  
  }

  //clears session storage
	clearCart(){
	  sessionStorage.clear();
	  document.getElementsByClassName('viewCart').innerHTML="";
	  document.getElementById('totalamount').innerHTML="";
	  this.getCartTotal();
	}
}
