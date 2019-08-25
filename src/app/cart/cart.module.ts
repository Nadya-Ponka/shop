import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';
import { SharedModule } from './../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
 declarations: [CartRoutingModule.components, CartComponent],
 imports: [
  CommonModule, SharedModule, CartRoutingModule, FormsModule
 ]
})
export class CartModule { }
