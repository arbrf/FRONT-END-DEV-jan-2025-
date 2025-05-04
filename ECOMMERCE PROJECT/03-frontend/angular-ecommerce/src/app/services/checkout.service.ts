import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Purchase } from '../common/Purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl=environment.luv2ShopApiIrl+"api/checkout/purchase";

 // private purchaseUrl = "http://localhost:8080/api/checkout/purchase";

  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
