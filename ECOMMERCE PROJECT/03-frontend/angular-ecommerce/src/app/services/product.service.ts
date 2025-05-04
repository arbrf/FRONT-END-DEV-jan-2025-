import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl=environment.luv2ShopApiIrl+"products";


 // private baseUrl = 'http://localhost:8080/api/products';

 private categoryUrl = environment.luv2ShopApiIrl+"product-category";
 // private categoryUrl = 'http://localhost:8080/api/product-category';


  //http://localhost:8081/api/products/search/findById?id=1
  constructor(private httpClient: HttpClient) { }
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    console.log("thePaginate URl  "+searchUrl);
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productcategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    //find by name containing
    const searchbyName = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    console.log(searchbyName);
    return this.getProducts(searchbyName);
  }
 searchProductsPaginate(thePage: number, thePageSize: number, keyword: string): Observable<GetResponseProducts> {

     // need to build URL based on category id
   //  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
   const searchbyName = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${thePage}&size=${thePageSize}`;
     console.log("thePaginate URl  "+searchbyName);
     return this.httpClient.get<GetResponseProducts>(searchbyName);
   }

  private getProducts(searchbyName: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchbyName).pipe(
      map(response => response._embedded.products)
    );
  }
  getProduct(productID: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productID}`;
    //http://localhost:8080/api/products/76
    console.log(productUrl);
    /*
    return this.httpClient.get<GetResponseProduct>(productUrl).pipe(
      map(response => response._embedded.products)
    );*/
    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }

}
interface GetResponseProduct {
  _embedded: {
    products: Product;
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productcategory: ProductCategory[];
  }
}