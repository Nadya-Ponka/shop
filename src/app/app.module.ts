import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { OrdersModule } from './orders/orders.module';
import { AppComponent } from './app.component';

@NgModule({
 declarations: [
  AppComponent
 ],
 imports: [
 BrowserModule,
 AppRoutingModule,
 ProductsModule,
 CartModule,
 CoreModule,
 SharedModule,
 OrdersModule
 ],
 bootstrap: [AppComponent]
})

export class AppModule { }
