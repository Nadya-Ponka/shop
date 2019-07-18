import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Item } from './../products/components/product-list-component/item';

@Injectable({
  providedIn: 'root'
})

export class CartService {
 constructor() { }
 public carts: Array<Item> = [];
 private channel = new Subject<any>();
 public channel$ = this.channel.asObservable();

 private counter = 0;

 public getTotalPrice = () => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
  const init = this.carts.reduce(reducer, 0);
  console.log('INIT: ', init);
  return init;
 }

 pushItem(item): void {
  const copyItem = JSON.parse(JSON.stringify(item));
  copyItem.id += (this.carts.length + this.counter);
  this.counter += 1;
  this.carts.push(copyItem);
  this.channel.next(this.carts);
 }

 pushCarts = (array) => {
  this.carts = null;
  this.carts = array;
 }
}
