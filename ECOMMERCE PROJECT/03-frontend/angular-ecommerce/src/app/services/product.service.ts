import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {






  private baseUrl = 'http://localhost:8081/api/products';

  private categoryUrl = 'http://localhost:8081/api/product-category';


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
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    //find by name containing
    const searchbyName = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchbyName);
  }


  private getProducts(searchbyName: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchbyName).pipe(
      map(response => response._embedded.products)
    );
  }
  getProduct(productID: number): Observable<Product[]> {
    const productUrl = `${this.baseUrl}/search/findById?id=${productID}`;
    console.log(productUrl);
    return this.httpClient.get<GetResponseProduct>(productUrl).pipe(
      map(response => response._embedded.products)
    );
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
    products: Product[];
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}