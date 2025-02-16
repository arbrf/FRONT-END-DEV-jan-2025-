import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // ✅ Import this
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule  // ✅ Add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
