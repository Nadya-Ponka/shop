import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order/order.component';
import { PathNotFoundComponent } from './shared/components/path-not-found/path-not-found.component';
import { ProductReviewsComponent } from './products/components/product-reviews/product-reviews.component';
import { LoginComponent } from './layout/components/login/login.component';

const routes: Routes = [{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'product/:productID',
    component: ProductReviewsComponent,
    outlet: 'review'
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PathNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
