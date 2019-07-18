import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './products/components/product/product.component';
import { ProductListComponentComponent } from './products/components/product-list-component/product-list-component.component';
import { ProductsServiceService } from './products/services/products-service.service';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartComponent } from './cart/cart.component';
import { HighlightDirective } from './shared/highlight.directive';

@NgModule({
 declarations: [
  AppComponent,
  ProductComponent,
  ProductListComponentComponent,
  CartListComponent,
  CartComponent,
  HighlightDirective
 ],
 imports: [
  BrowserModule,
  AppRoutingModule
 ],
 providers: [ProductsServiceService],
 bootstrap: [AppComponent]
})

export class AppModule { }
