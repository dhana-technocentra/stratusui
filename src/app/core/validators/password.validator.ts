import { FormControl, FormGroup, AbstractControl, NgForm, FormGroupDirective } from '@angular/forms';

export class PasswordValidator {
 /*
  static areEqual(formGroup: FormGroup) {
    let value;
    let valid = true;
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (value === undefined) {
          value = control.value
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
*/
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value; // to get value in input tag
    let confirmPassword = abstractControl.get('confirm_password').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         abstractControl.get('confirm_password').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }
}