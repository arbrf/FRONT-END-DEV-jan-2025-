import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject,ReplaySubject,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems : CartItem[]=[];
totalPrice:Subject<number>=new BehaviorSubject<number>(0);
totalQuantity:Subject<number>=new BehaviorSubject<number>(0);
// storage: Storage=sessionStorage;
storage: Storage=localStorage;

 constructor() {
   // Read data from storage
   const data = this.storage.getItem('cartItems');

   if (data) {
     try {
       const parsedData = JSON.parse(data) as CartItem[];
       this.cartItems = parsedData;
       this.computeCartTotals();
     } catch (e) {
       console.error('Failed to parse cartItems from localStorage', e);
     }
   }
 }





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
   this.persistCartItems();
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

   decrementQuantity(theCartItem : CartItem){
          theCartItem.quantity--;
          if(theCartItem.quantity==0){
              this.removeCartItem(theCartItem);
           }
          else{
           this.computeCartTotals();
           }
      }

  removeCartItem(theCartItem : CartItem){
  const itemIndex=this.cartItems.findIndex(tempcartItem=>tempcartItem.id===theCartItem.id);
  console.log(itemIndex);
        if(itemIndex>-1){
        this.cartItems.splice(itemIndex,1);

         this.computeCartTotals();
      }

 }

 persistCartItems(){
   this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
}
}
