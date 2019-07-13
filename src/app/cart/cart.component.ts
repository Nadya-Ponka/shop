import { Component, OnInit } from '@angular/core';

import { Item } from './../products/components/product-list-component/item';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	constructor(private CartService: CartService) { }
	carts: Array<Item>

	onBuy = function () {
		console.log('Congratulation! Product was bought!');
	}
  ngOnInit() {
		this.carts = this.CartService.getItemsFromCart();
  }

}
