import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list-component/product-list.component';

@NgModule({
 declarations: [
  ProductComponent,
  ProductListComponent
 ],
 exports: [
  ProductListComponent
 ],
 imports: [
  CommonModule
 ]
})
export class ProductsModule { }
