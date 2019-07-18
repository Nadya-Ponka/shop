import { Injectable } from '@angular/core';

import { Item } from './../components/product-list-component/item';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
 constructor() { }

 getProducts(): Array<Item> {
  return [
   new Item( 1, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 't-shirt', 'T-shirt', 5, 'men', 0 ),
   new Item( 2, ['10Litry'], ['green', 'red', 'yellow'], 'backpack', 'backpack', 5.95, 'men', 1 ),
   new Item( 3, ['M', 'XL', 'XXL'], ['grey', 'blue'], 't-shirt-1', 'T-shirt', 19.95, 'women', 1 ),
   new Item( 4, ['s', 'm', 'l'], ['turquois', 'red', 'yellow'], 'jacket', 'jacket', 51, 'women', 0 ),
   new Item( 5, ['s', 'm', 'l'], ['turquois', 'red', 'yellow'], 'jacket', 'jacket', 51, 'women', 0 ),
   new Item( 6, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 't-shirt', 'T-shirt', 5, 'men', 0 ),
   new Item( 7, ['10Litry'], ['green', 'red', 'yellow'], 'backpack', 'backpack', 5.95, 'men', 0 )
  ];
 }
}
