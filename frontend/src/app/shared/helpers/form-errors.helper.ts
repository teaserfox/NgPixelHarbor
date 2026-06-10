import { AbstractControl } from '@angular/forms';
import { VALIDATION_MESSAGES } from '../constants/validation-messages';

export class FormErrorsHelper {

  static getError(control: AbstractControl | null, field: string): string {

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return VALIDATION_MESSAGES[field as keyof typeof VALIDATION_MESSAGES] || '';
    }

    if (control.hasError('invalidPhone')) {
      return VALIDATION_MESSAGES.phoneError;
    }

    if (control.hasError('pattern')) {

      switch (field) {

        case 'email':
          return VALIDATION_MESSAGES.emailError;

        case 'password':
          return VALIDATION_MESSAGES.passwordPattern;

        default:
          return '';
      }
    }

    return '';
  }
}
