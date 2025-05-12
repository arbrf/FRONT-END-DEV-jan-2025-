import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Purchase } from '../common/purchase';
import { Paymentinfo } from '../common/paymentinfo';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.luv2ShopApiIrl + "checkout/purchase";
  private paymentIntentUrl = environment.luv2ShopApiIrl + "checkout/payment-intent";
  private authUrl = "https://localhost:8443/api/authenticate";

  // Hardcoded password
  private hardcodedPassword = "NO_PASSWORD";

  constructor(private httpClient: HttpClient) {}

  // Method to call authentication API and get token
  private authenticate(): Observable<string> {
    const email = sessionStorage.getItem('userEmail');
  
    if (!email) {
      throw new Error('User email not found in sessionStorage.');
    }
  
    // Remove the extra quotes if present
    const cleanedEmail = email.replace(/['"]+/g, '');
  
    const authPayload = {
      username: cleanedEmail,
      password: this.hardcodedPassword
    };
  
    return this.httpClient.post<{ token: string }>(this.authUrl, authPayload)
      .pipe(
        map(response => response.token)
      );
  }
  

  placeOrder(purchase: Purchase): Observable<any> {
    return this.authenticate().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.post(this.purchaseUrl, purchase, { headers });
      })
    );
  }

  createPaymentIntent(paymentInfo: Paymentinfo): Observable<any> {
    return this.authenticate().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.post(this.paymentIntentUrl, paymentInfo, { headers });
      })
    );
  }

}
