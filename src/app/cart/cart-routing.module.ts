import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartFormComponent } from './cart-form/cart-form.component';

const routes: Routes = [
    {
        path: 'cart',
        component: CartListComponent,
        children: [
          {
            path: 'edit/:userID',
            component: CartFormComponent,
          },
          {
            path: '',
            component: CartListComponent
          },
        ]
      }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { 
    static components = [CartComponent, CartListComponent, CartFormComponent];
}