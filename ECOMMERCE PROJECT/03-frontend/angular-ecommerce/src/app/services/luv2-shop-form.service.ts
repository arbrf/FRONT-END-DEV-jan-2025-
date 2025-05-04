import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,map } from 'rxjs';
import { Country } from '../common/countries';
import { State } from '../common/states';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

    private countriesUrl=environment.luv2ShopApiIrl+"countries";

 // private countriesUrl="http://localhost:8080/api/countries";
  private statesUrl=environment.luv2ShopApiIrl+"states/search/findByCountryCode?code=";

  //private statesUrl="http://localhost:8080/api/states/search/findByCountryCode?code=";

 constructor(private httpClient: HttpClient) { }

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
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map((response: GetResponseCountries) => response._embedded.countries) // ✅ Fixed type
    );
  }

  getStates(countrycode: string): Observable<State[]> {
    const statesByCountry = this.statesUrl + countrycode;
    return this.httpClient.get<GetResponseStates>(statesByCountry).pipe(
      map((response: GetResponseStates) => response._embedded.states) // ✅ Fixed type
    );
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}