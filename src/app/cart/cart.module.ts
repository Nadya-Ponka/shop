import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartComponent } from './cart.component';

@NgModule({
 declarations: [CartListComponent, CartComponent],
 imports: [
  CommonModule
 ],
 exports: [
  CartListComponent,
  CartComponent
 ]
})
export class CartModule { }
