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
      })
    });
  }

  onSubmit(){
      console.log("Handling Form Submission");
      console.log(this.checkoutFormGroup.get('customer')?.value);
  }
}
