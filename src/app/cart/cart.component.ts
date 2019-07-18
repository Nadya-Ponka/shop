import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// Похоже не хватает части функционала. Проект не запускается, так как нет функционала products
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
