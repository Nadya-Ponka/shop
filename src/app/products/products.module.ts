import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponentComponent } from './components/product-list-component/product-list-component.component';

@NgModule({
 declarations: [
  ProductComponent,
  ProductListComponentComponent
 ],
 exports: [
  // ProductComponent, компонент может быть приватным, не используется в других модулях
  ProductListComponentComponent
 ],
 imports: [
  CommonModule
 ]
})
export class ProductsModule { }