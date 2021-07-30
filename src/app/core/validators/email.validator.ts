import { AbstractControl } from '@angular/forms';

export class EmailGlobalValidator {

  static emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // tslint:disable-next-line: max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // tslint:disable-next-line: no-bitwise
    if (control.value !== '' && (control.value.length <= 5 || !emailRegex.test(control.value) )) {
        return { emailInvalid: true };
    }
    return null;
  }
}