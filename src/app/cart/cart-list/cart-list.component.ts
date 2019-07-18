import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {
 constructor(private CartComponentService: CartService) { }
 private sub: Subscription;
 carts: Array<any> = [];

 public totalPrice;

 onBuy = () => {
  console.log('Congratulation! Product was bought!');
 }

 removeItem = (item) => {
  console.log('Need to remove: ', item);
  for ( let i = 0; i < this.carts.length; i++ ) {
   if (this.carts[i].id === item.id) {
    this.carts.splice(i, 1);
    break;
   }
  }
  this.CartComponentService.pushCarts(this.carts);
  this.totalPrice = this.CartComponentService.getTotalPrice();
 }

 ngOnInit() {
  this.sub = this.CartComponentService.channel$.subscribe(
   data => {
    this.carts = data;
    this.totalPrice = this.CartComponentService.getTotalPrice();
   }
  );
 }
 ngOnDestroy() {
  this.sub.unsubscribe();
 }
}
