import { AbstractControl, ValidatorFn } from '@angular/forms';

// rxjs
import { Observable } from 'rxjs';

export class CustomValidators {

  static emailMatcher(c: AbstractControl): {
    [key: string]: boolean
  } | null {
    const emailControl = c.get('email');
    const emailConfirmControl = c.get('confirmEmail');

    if (emailControl.pristine || emailConfirmControl.pristine) {
      return null;
    }

    if (emailControl.value === emailConfirmControl.value) {
      return null;
    }

    return {
      'emailMatch': true
    };
  }

  static asyncEmailPromiseValidator(
      c: AbstractControl
    ):
    |
    Promise < {
      [key: string]: any
    } | null > | Observable < {
      [key: string]: any
    } | null > {
      const email = c.value;

      return new Promise(resolve => {
        setTimeout(() => {
          if (email === 'existsemail@example.com') {
            resolve({
              asyncEmailInvalid: true
            });
          } else {
            resolve(null);
          }
        }, 2000);
      });
    }
}
