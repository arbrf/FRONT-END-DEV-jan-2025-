import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms'; // ✅ Corrected import
import { Country } from 'src/app/common/countries';
import { State } from 'src/app/common/states';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';

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
  firstName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
  ]),
  lastName: new FormControl('', [
   Validators.required, Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
  ])
}),

      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [
                     Validators.required

                   ]),
        street: new FormControl('', [
                    Validators.required,
                    Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
                  ]),
        state: new FormControl('', [
                                    Validators.required

                                  ]),
        zipcode: new FormControl('', [
                     Validators.required,
                     Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
                   ]),
        city: new FormControl('', [
                  Validators.required,
                  Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
                ])
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [
                             Validators.required

                           ]),
                street: new FormControl('', [
                            Validators.required,
                            Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
                          ]),
                state: new FormControl('', [
                                            Validators.required

                                          ]),
                zipcode: new FormControl('', [
                             Validators.required,
                             Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
                           ]),
                city: new FormControl('', [
                          Validators.required,
                          Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
                        ])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [
                                            Validators.required

                                          ]),
        nameOnCard:new FormControl('', [
                                             Validators.required,
                                             Validators.minLength(2),Luv2ShopValidators.notOnlyWhiteSpace
                                           ]),
         cardNumber: new FormControl('', [
              Validators.required,
              Luv2ShopValidators.notOnlyWhiteSpace,
              Validators.pattern('[0-9]{16}')
            ]),

        securityCode: new FormControl('', [
                                                                    Validators.required,
                                                                    Luv2ShopValidators.notOnlyWhiteSpace,Validators.pattern('[0-9]{3}')
                                                                  ]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required])
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

      if(this.checkoutFormGroup.invalid){
          this.checkoutFormGroup.markAllAsTouched();
      }
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

get firstName(){
return this.checkoutFormGroup.get('customer.firstName') as FormControl;
}
get lastName(){
return this.checkoutFormGroup.get('customer.lastName') as FormControl;
}
get email(){
return this.checkoutFormGroup.get('customer.email') as FormControl;
}


get street(){
return this.checkoutFormGroup.get('shippingAddress.street') as FormControl;
}
get city(){
return this.checkoutFormGroup.get('shippingAddress.city') as FormControl;
}
get state(){
return this.checkoutFormGroup.get('shippingAddress.state') as FormControl;
}

get country(){
return this.checkoutFormGroup.get('shippingAddress.country') as FormControl;
}
get zipcode(){
return this.checkoutFormGroup.get('shippingAddress.zipcode') as FormControl;
}

//billing address
get billingstreet(){
return this.checkoutFormGroup.get('billingAddress.street') as FormControl;
}
get billingcity(){
return this.checkoutFormGroup.get('billingAddress.city') as FormControl;
}
get billingstate(){
return this.checkoutFormGroup.get('billingAddress.state') as FormControl;
}

get billingcountry(){
return this.checkoutFormGroup.get('billingAddress.country') as FormControl;
}
get billingzipcode(){
return this.checkoutFormGroup.get('billingAddress.zipcode') as FormControl;
}

//creditcard
get cardType(){
return this.checkoutFormGroup.get('creditCard.cardType') as FormControl;
}
get nameOnCard(){
return this.checkoutFormGroup.get('creditCard.nameOnCard') as FormControl;
}
get cardNumber(){
return this.checkoutFormGroup.get('creditCard.cardNumber') as FormControl;
}

get securityCode(){
return this.checkoutFormGroup.get('creditCard.securityCode') as FormControl;
}
get expirationMonth(){
return this.checkoutFormGroup.get('creditCard.expirationMonth') as FormControl;
}

get expirationYear(){
return this.checkoutFormGroup.get('creditCard.expirationYear') as FormControl;
}
}
