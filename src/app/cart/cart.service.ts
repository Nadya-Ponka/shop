import { Injectable } from '@angular/core';

import { Item } from './../products/components/product-list-component/item';

@Injectable({
  providedIn: 'root'
})

export class CartService {

	constructor() { }
	
	getItemsFromCart(): Array<Item> {
    return [
			new Item(6,['s', 'm', 'l'],['green', 'red', 'pink'],'t-shirt','T-shirt',5,'children',1),
			new Item(7,['m', 'l'],['violet', 'pink'],'t-shirt','T-shirt',7.65,'men',1),
			new Item(8,['s', 'm', 'l'],['green', 'red', 'yellow'],'pants','pants',6,'men',1),
     ];
  }
}
