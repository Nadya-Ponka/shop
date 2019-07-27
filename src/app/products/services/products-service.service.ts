import {
  Injectable
} from '@angular/core';

import {
  Item
} from '../../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() {}

  getProducts(): Promise < Item[] > {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          new Item(1, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 't-shirt', 't-shirt', 5, 'men', 0),
          new Item(2, ['10Litry'], ['green', 'red', 'yellow'], 'backpack', 'backpack', 5.95, 'men', 1),
          new Item(3, ['M', 'XL', 'XXL'], ['grey', 'blue'], 't-shirt-1', 't-shirt', 19.95, 'women', 1),
          new Item(4, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 'jacket', 'jacket', 25, 'women', 0),
          new Item(5, ['s', 'm', 'l'], ['blue', 'red', 'yellow'], 'jacket', 'Jacket', 51, 'women', 0),
          new Item(6, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 't-shirt', 'T-shirt', 5, 'men', 0),
          new Item(7, ['10Litry'], ['green', 'red', 'yellow'], 'backpack', 'backpack', 5.95, 'men', 0)
        ]);
      }, 5000);
    });
  }
}
