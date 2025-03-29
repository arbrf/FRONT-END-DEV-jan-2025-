import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }

  getCreditCardMonth(startMonth: number): Observable<number[]> { // ✅ Fixed return type
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> { // ✅ Fixed return type
    let data: number[] = [];
    const startYear = new Date().getFullYear();
    
    for (let theYear = startYear; theYear <= startYear + 10; theYear++) { // ✅ Fixed loop condition
      data.push(theYear);
    }
    return of(data);
  }
}
