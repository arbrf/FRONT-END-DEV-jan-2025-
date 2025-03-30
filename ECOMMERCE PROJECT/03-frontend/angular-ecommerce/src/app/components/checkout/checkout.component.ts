import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'; // ✅ Corrected import
import { Country } from 'src/app/common/countries';
import { State } from 'src/app/common/states';
import { CartService } from 'src/app/services/cart.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  states: State[] = [];

  constructor(private formBuilder: FormBuilder, private cartService: CartService, private luv2shopService: Luv2ShopFormService) { } // ✅ Fixed `cartService`

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        state: [''],
        zipcode: [''],
        city: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        state: [''],
        zipcode: [''],
        city: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''], // ✅ Fixed naming convention
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // ✅ Subscribe to cart service to update total price and quantity
    this.cartService.totalPrice.subscribe(data => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(data => (this.totalQuantity = data));

    //Populate credit card months and year
    const month = new Date().getMonth() + 1;
    console.log("Start Month" + month);
    this.luv2shopService.getCreditCardMonth(month).subscribe(
      data => {
        console.log("Retrieved Data" + JSON.stringify(data));
        this.creditCardMonths = data
      }
    );
    this.luv2shopService.getCreditCardYears().subscribe(data => {
      console.log("retreived YEars" + JSON.stringify(data))
      this.creditCardYears = data
    });

    this.luv2shopService.getCountries().subscribe(data => this.countries = data);



  }

  onSubmit(): void {
    console.log("Handling Form Submission");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    
    console.log("The Email address: " + this.checkoutFormGroup.get('customer')?.value.email);

  }

  copyShippingAddressToBillingAddress(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked; // ✅ Extract checkbox state correctly

    if (isChecked) {
      this.checkoutFormGroup.get('billingAddress')?.setValue(
        this.checkoutFormGroup.get('shippingAddress')?.value
      );
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }
  }
  handleMonthsandYears() {
    console.log("Inside handleMonthsandYears");

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    // ✅ Corrected getFullYear() call
    const currentYear: number = Number(new Date().getFullYear());
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1; // ✅ Ensure next month's selection
    } else {
      startMonth = 1;
    }

    // ✅ Correct Subscription to update months dynamically
    this.luv2shopService.getCreditCardMonth(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
  }

  getCountryCode(event: Event, formGroupName: string) {
    // Retrieve the selected country object from the form
    const countryObject = this.checkoutFormGroup.get(formGroupName)?.value.country;

    console.log(`Selected Country from ${formGroupName}:`, countryObject);

    if (countryObject?.code) {
        // Fetch states based on selected country code
        this.luv2shopService.getStates(countryObject.code).subscribe(data => {
            this.states = data;
            console.log(`Fetched States for ${countryObject.name}:`, data);
        });
    } else {
        console.warn("No country code found!");
    }
}


  


}
