import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number=1;
  searchKeyWord:boolean = false;
  thePageNumber:number =1;
  thePageSize:number =5;
  theTotalElements:number = 0;
  
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
  this.searchKeyWord=this.route.snapshot.paramMap.has('keyword');
  if(this.searchKeyWord){
      this.handleSearchProducts();
  }
  else{
    this.handleListProducts();
  }
   
  }
  handleSearchProducts() {

    const searchkeywords: string = this.route.snapshot.paramMap.get('keyword') ?? '';


    console.log(searchkeywords+"product list component ts");
    this.productService.searchProducts(searchkeywords).subscribe(
      data => {
        this.products = data;
      }
    )
  }
  handleListProducts(){
     // check if "id" parameter is available
     const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
     console.log(`inside handleListProducts`);
     if (hasCategoryId) {
       // get the "id" param string. convert string to a number using the "+" symbol
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
     }
     else {
       // not category id available ... default to category id 1
       this.currentCategoryId = 1;
     }
     /**
      * Check if have a different categoryId then previous
      * Note Angular will reuse a component if its currently being used
      * if we have different categoryId then previous set the pageNMumber to 1
      */
     if(this.currentCategoryId!=this.previousCategoryId){
      this.thePageNumber=1;
     }
     this.previousCategoryId=this.currentCategoryId;
     
     // now get the products for the given category id
    /* this.productService.getProductList(this.currentCategoryId).subscribe(
       data => {
         this.products = data;
       }
     )*/
    this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId)
    .subscribe(data=>{
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize=data.page.size;
        this.theTotalElements=data.page.totalElements;
        console.log(`the current categoryID ${this.currentCategoryId} and pageNumber ${this.thePageNumber}
          the previous categoryID ${this.previousCategoryId} thepagsize ${this.thePageSize}`);
    });
  }
}
