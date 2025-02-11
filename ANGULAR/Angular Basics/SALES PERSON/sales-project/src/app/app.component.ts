import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesPersonListComponent } from "./sales-person-list/sales-person-list.component";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SalesPersonListComponent,CommonModule],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sales-project';
}
