import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/orders.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
 declarations: [
  AppComponent
 ],
 imports: [
 BrowserModule,
 CoreModule,
 SharedModule,
 AdminModule,
 ProductsModule,
 CartModule,
 LayoutModule,
 OrderModule,
 AppRoutingModule
 ],
 bootstrap: [AppComponent]
})

export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
