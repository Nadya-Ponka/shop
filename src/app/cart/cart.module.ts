import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartComponent } from './cart.component';
import { CartFormComponent } from './cart-form/cart-form.component';
import { SharedModule } from './../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
 declarations: [CartListComponent, CartComponent, CartFormComponent],
 imports: [
  CommonModule, SharedModule, CartRoutingModule, FormsModule
 ],
 exports: [
  CartListComponent
 ],
})
export class CartModule { }
