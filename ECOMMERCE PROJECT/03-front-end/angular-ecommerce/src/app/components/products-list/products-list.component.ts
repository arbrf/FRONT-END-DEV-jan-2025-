import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule],
  templateUrl: './products-list-grid.component.html',
  //templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']  // ✅ Fixed "styleUrls"
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {} // ✅ Fixed service name

  ngOnInit(): void {
    this.listProducts(); // ✅ Call listProducts instead of throwing an error
  }

  listProducts(): void {
    this.productService.getProductList().subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    );
  }
}
