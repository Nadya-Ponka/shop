import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartComponent } from './cart.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
 declarations: [CartListComponent, CartComponent],
 imports: [
  CommonModule, SharedModule
 ],
 exports: [
  CartListComponent
 ],
})
export class CartModule { }
