import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list-component/product-list.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';

const routes: Routes = [
  {
    path: 'home',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
