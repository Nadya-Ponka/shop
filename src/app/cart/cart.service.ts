import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Item } from '../shared/models/item';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  constructor() {}

  private channel = new Subject < any > ();
  public channel$ = this.channel.asObservable();

  public arrayItems = [];

  getTotalPrice() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.elem.price * currentValue.count;
    const init = this.arrayItems.reduce(reducer, 0);
    return init;
  }

  getTotalCount() {
  const reducer = (accumulator: number, currentValue) => accumulator + currentValue.count;
  const init = this.arrayItems.reduce(reducer, 0);
  return init;
  }

  pushItem(item: Item): void {
    if (this.arrayItems && this.arrayItems.length > 0) {
      let elementWasFound = false;
      this.arrayItems.forEach(el => {
        if (el.elem.id === item.id) {
          el.count += 1;
          elementWasFound = true;
        }
      });
      if (!elementWasFound) {
        this.arrayItems.push({
          count: 1,
          elem: item
        });
      }
    } else {
      this.arrayItems.push({
        count: 1,
        elem: item
      });
    }
    this.channel.next(this.arrayItems);
  }

  emptyCart() {
    this.arrayItems = [];
    this.channel.next(this.arrayItems);
	}
	
  pushCarts(array: Item[]) {
    this.arrayItems = null;
    this.arrayItems = array;
  }

  removeItem(item: { elem: Item, count: number }) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].elem.id === item.elem.id) {
        this.arrayItems.splice(i, 1);
      }
    }
  }

  incrementCount(item: { elem: Item, count: number }) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].elem.id === item.elem.id) {
        this.arrayItems[i].count += 1;
      }
    }
  }

  decrementCount(item: { elem: Item, count: number }) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].elem.id === item.elem.id) {
        if (this.arrayItems[i].count > 1) {
          this.arrayItems[i].count -= 1;
        } else {
          this.arrayItems.splice(i, 1);
        }
      }
    }
  }
}
