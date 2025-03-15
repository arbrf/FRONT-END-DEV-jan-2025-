import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    product: Product | undefined;
  constructor(private productService:ProductService,private route: ActivatedRoute,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const productID: number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(productID).subscribe(data => {
      this.product=data;
      //console.log(`product data: ${JSON.stringify(this.product)}`);
      //console.log(this.product.name);
    });
  }
  addToCart() {
      if (this.product) {  // ✅ Ensure product is not undefined
        console.log(`The product ${this.product.name} and price is ${this.product.unitPrice}`);
        const cartItem = new CartItem(this.product);
        this.cartService.addToCart(cartItem);
      } else {
        console.log("Error: Product is undefined, cannot add to cart.");
      }
    }
}
