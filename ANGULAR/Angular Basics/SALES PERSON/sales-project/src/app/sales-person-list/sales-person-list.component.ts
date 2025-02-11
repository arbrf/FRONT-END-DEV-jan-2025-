
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
    new SalesPerson("John", "Doe", "john@gmail.com",10),
    new SalesPerson("Murphy", "Law", "murphy@gmail.com",20),
    new SalesPerson("Trafalgar", "Law", "law@gmail.com",30),
    new SalesPerson("Zoro", "Roronoa", "robin@gmail.com",3),
    
   ];

}
