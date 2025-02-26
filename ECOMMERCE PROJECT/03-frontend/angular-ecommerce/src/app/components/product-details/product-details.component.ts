import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products:Product[]=[];
  constructor(private productService:ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const productID: number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(productID).subscribe(data => {
      this.products=data;
      //console.log(`product data: ${JSON.stringify(this.product)}`);
      //console.log(this.product.name);
    });
  }

}
