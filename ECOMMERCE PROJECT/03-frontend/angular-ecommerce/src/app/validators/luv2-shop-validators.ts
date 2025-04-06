import { FormGroup, FormBuilder,FormControl,Validators,ValidationErrors } from '@angular/forms'; // ✅ Corrected import

export class Luv2ShopValidators {
   static notOnlyWhiteSpace(control:FormControl):ValidationErrors | null{
       if(control.value!=null && control.value.trim().length===0){
         return {'notOnlyWhiteSpace':true}
        }
      return null;
   }
}
