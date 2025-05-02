import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history-service.service';
import { OrderHistory } from '../../common/order-history';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  sessionStorage: Storage = sessionStorage;
  orderHistoryList: OrderHistory[] = [];

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.getApiToken();  // First get token
  }

  getApiToken() {
    const userEmailString = this.sessionStorage.getItem('userEmail');
    const email = userEmailString ? JSON.parse(userEmailString) : null;
     console.log("Calling authenticate api");
    if (email) {
      this.orderHistoryService.authenticate(email, "NO_PASSWORD").subscribe({
        next: response => {
          // Store token in sessionStorage
          this.sessionStorage.setItem('authToken', response.token);
          console.log(response.token);
          // Now that token is set, fetch order history
          this.handleOrderHistory();
        },
        error: err => {
          console.error('Failed to authenticate and get token:', err);
        }
      });
    } else {
      console.error('No email found in sessionStorage');
    }
  }

  handleOrderHistory() {
    const userEmailString = this.sessionStorage.getItem('userEmail');
    const theEmail = userEmailString ? JSON.parse(userEmailString) : null;

    if (theEmail) {
      this.orderHistoryService.getOrderHistory(theEmail).subscribe({
        next: data => {
          this.orderHistoryList = data._embedded.order;
        },
        error: err => {
          console.error('Failed to fetch order history:', err);
        }
      });
    }
  }

}
