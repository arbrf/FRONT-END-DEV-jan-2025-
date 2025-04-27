import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history-service.service';
import { OrderHistory } from '../../common/order-history';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
storage:Storage=sessionStorage;
orderHistoryList:OrderHistory[]=[];
  constructor(
     private orderHistoryService: OrderHistoryService
      ) { }

  ngOnInit(): void {
  this.handleOrderHistory();
  }

  handleOrderHistory(){
     const userEmailString = this.storage.getItem('userEmail');
     const theEmail = userEmailString ? JSON.parse(userEmailString) : null;

  this.orderHistoryService.getOrderHistory(theEmail).subscribe(data=>{
        this.orderHistoryList=data._embedded.order;
      });
  }
}
