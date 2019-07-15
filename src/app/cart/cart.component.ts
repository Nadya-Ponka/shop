import { Component, Input, OnInit } from '@angular/core';

import { Item } from './../products/components/product-list-component/item';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 constructor() {}

 onBuy = () => {
  console.log('Congratulation! Product was bought!');
 }
 ngOnInit() {
}
}
