import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'; // ✅ Fixed import

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { } // ✅ Fixed FormBuilder

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
                  securitycode: [''],
                  expirationMonth: ['']
                })
    });
  }

  onSubmit(){
      console.log("Handling Form Submission");
      console.log(this.checkoutFormGroup.get('customer')?.value);
      console.log("The Email address "+this.checkoutFormGroup.get('customer')?.value.email);
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked; // ✅ Correctly extract checkbox state

    if (isChecked) {
      this.checkoutFormGroup.get('billingAddress')?.setValue(
        this.checkoutFormGroup.get('shippingAddress')?.value
      );
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }
  }

}
