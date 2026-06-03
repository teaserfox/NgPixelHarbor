import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validators} from "@angular/forms";

@Directive({
  selector: '[PasswordRepeat]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordRepeatDirective, multi: true}],
})
export class PasswordRepeatDirective implements Validators {

  validate(control: AbstractControl): Validators | null {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    if (password?.value !== passwordRepeat?.value) {
      passwordRepeat?.setErrors({passwordRepeat: true});
      return passwordRepeat;
    }
    return null;
  }

}
