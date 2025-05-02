import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  storage: Storage = sessionStorage;
  private orderUrl = 'http://localhost:8080/api/order';
  private authUrl = 'http://localhost:8080/api/authenticate';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;

    // Retrieve token from sessionStorage (consistent)
    const token = this.storage.getItem('authToken');

    // Set Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl, { headers: headers });
  }

  authenticate(username: string, password: string): Observable<AuthResponse> {
    const body = {
      username: username,
      password: password
    };

    return this.httpClient.post<AuthResponse>(this.authUrl, body);
  }

}

interface GetResponseOrderHistory {
  _embedded: {
    order: OrderHistory[];
  }
}

export interface AuthResponse {
  token: string;
}
