import { Product } from '../common/product';
export class CartItem {
    id:number;
    name:string;
    imageUrl:string;
    unitPrice:number;
    quantity:number;
    constructor(product:Product){
        this.id=product.id;
        this.name=product.name;
        this.imageUrl=product.imageUrl;
        this.unitPrice=product.unitPrice;
        this.quantity=1;

    }

}
