import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list-component/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsAPIProvider } from './products.config';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductReviewsComponent, ProductFormComponent],
  exports: [
    ProductListComponent, ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductsAPIProvider
  ]

})
export class ProductsModule {}
