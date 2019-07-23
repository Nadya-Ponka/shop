// Почему-то этот компонент без папки, лежит в корне cart, хотя используется в cart-list
// такая структура удобнее
// cart
//   components
//     cart-list
//     cart
//   services
//     cart.service
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Item } from './../products/components/product-list-component/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 constructor() {}
 @Input() cart: Item;
 @Output() remove: EventEmitter<Item> = new EventEmitter();

 removeItem = (item) => {
  console.log('Remove item from cart: ', item);
  this.remove.emit(item);
 }
 ngOnInit() {
 }
}
