import { Component, OnInit, Input } from '@angular/core';

import { Item } from './../../products/components/product-list-component/item';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
	constructor(private CartComponentService: CartService) { }
	
	@Input() product: Item;
	carts: Array<Item> = [];

	onBuy = () => {
	 console.log('Congratulation! Product was bought!');
	}
	ngOnInit() {
	 this.carts.push(this.product);
	}
 
}
