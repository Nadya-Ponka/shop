import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CartModule } from './cart/cart.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { RootStoreModule } from './core/@ngrx/root-store.module';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/orders.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { LayoutModule } from './layout/layout.module';
import { SpinnerModule } from './widgets/spinner/spinner.module';
import { httpInterceptorProviders } from './core/interceptors';

@NgModule({
 declarations: [
  AppComponent
 ],
 imports: [
 AdminModule,
 BrowserModule,
 CartModule,
 CoreModule,
 HttpClientModule,
 LayoutModule,
 OrderModule,
 ProductsModule,
 SharedModule,
 SpinnerModule.forRoot(),
 RootStoreModule,
 AppRoutingModule
 ],
 bootstrap: [AppComponent],
 providers: [ httpInterceptorProviders ]
})

export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
