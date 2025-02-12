
import { SalesPerson } from './sales-person';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sales-person-list',
  imports: [CommonModule],
  templateUrl: './sales-person-list.component.html',
  styleUrl: './sales-person-list.component.css'
})
export class SalesPersonListComponent {
   salesPersonlist: SalesPerson[]=[  
    new SalesPerson("John", "Doe", "john@gmail.com",10000),
    new SalesPerson("Murphy", "Law", "murphy@gmail.com",20000),
    new SalesPerson("Trafalgar", "Law", "law@gmail.com",30000),
    new SalesPerson("Zoro", "Roronoa", "robin@gmail.com",5000),
    
   ];

}
