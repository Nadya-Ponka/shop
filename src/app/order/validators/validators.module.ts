import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncEmailValidatorDirective } from './async-email-validator.directive';

@NgModule({
  declarations: [AsyncEmailValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [AsyncEmailValidatorDirective]
})
export class ValidatorsModule { }
