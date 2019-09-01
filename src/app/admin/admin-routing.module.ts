import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageOrderComponent, ManageProductsComponent } from './components';
import { AuthGuard } from './../core';
import { ProductListComponent } from '../products/components/product-list-component/product-list.component';
import { ProductFormComponent } from '../products/components/product-form/product-form.component';
import { ProductResolveGuard } from './../products/guards';

const routes: Routes = [{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    children: [{
        path: 'order',
        component: ManageOrderComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'products/add',
        component: ProductFormComponent
      },
      {
        path: 'product/edit/:productID',
        component: ProductFormComponent,
        /* resolve: {
          product: ProductResolveGuard
        } */
      },
      /*           { path: '', component: ProductListComponent }
       */
    ]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    ManageProductsComponent,
    ManageOrderComponent
  ];
}
