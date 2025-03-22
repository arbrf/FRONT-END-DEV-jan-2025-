import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems : CartItem[]=[];
totalPrice:Subject<number>=new Subject<number>();
totalQuantity:Subject<number>=new Subject<number>();


  constructor() { }
  addToCart(theCartItem : CartItem){
      //check if the cartitem exists
      let alreadyExisitinCart:boolean=false;
      let existingCartItem:CartItem=undefined!;

      if(this.cartItems.length>0){
          for(let tempcartItems of this.cartItems){
           if (theCartItem.id === tempcartItems.id) {
               existingCartItem=tempcartItems;
               break;
            }
          }
     alreadyExisitinCart = (existingCartItem !== undefined);


      }
    if(alreadyExisitinCart){
        existingCartItem.quantity++;
     }
 else{

     this.cartItems.push(theCartItem);
     }

   this.computeCartTotals();

  }

  computeCartTotals(){
      let totalPriceValue:number=0;
      let totalQuantityValue:number=0;
      for(let currentItem of this.cartItems){

          totalPriceValue+=currentItem.quantity*currentItem.unitPrice;
          totalQuantityValue+=currentItem.quantity;

       }

   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue);

   this.logCartData(totalPriceValue,totalQuantityValue);
  }
  logCartData(totalPriceValue:number,totalQuantityValue:number){
      console.log(`logging cart items`);
      for(let tempcartItems of this.cartItems){
          const subtotalprice=tempcartItems.quantity*tempcartItems.unitPrice;
          console.log(`${tempcartItems.name} quantit:${tempcartItems.quantity}
              uniprice: ${tempcartItems.unitPrice} the totalprice: ${subtotalprice}`)
       }
    console.log(`totalPricevalue ${totalPriceValue.toFixed(2)},
     totalQuantity ${totalQuantityValue}`)
    console.log(`------------------------------------------------`);
   }
}
