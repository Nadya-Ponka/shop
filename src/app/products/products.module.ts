import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list-component/product-list.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
 declarations: [ ProductComponent, ProductListComponent, ProductReviewsComponent ],
 exports: [
  ProductListComponent
 ],
 imports: [
	CommonModule,
	ProductsRoutingModule
 ]
})
export class ProductsModule { }
