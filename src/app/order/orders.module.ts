import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { ValidatorsModule } from './validators/validators.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, ValidatorsModule
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule { }
