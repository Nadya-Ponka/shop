import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './shared/highlight.directive';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { OrdersModule } from './orders/orders.module';

@NgModule({
 declarations: [
  AppComponent,
  // Компоненты ведь от сюда должны быть убраны, если они добавлены в другие модули
  // ProductComponent,
  // ProductListComponentComponent,
  // CartListComponent,
  // CartComponent,
  // HighlightDirective
 ],
 imports: [
  BrowserModule,
  // Должны быть добавлены модули
  ProductsModule,
  CartModule,
  CoreModule,
  SharedModule,
  OrdersModule,
  AppRoutingModule
 ],
//  Сервис уже зарегистрирован через свой декоратор
//  providers: [ProductsServiceService],
 bootstrap: [AppComponent]
})

export class AppModule { }
