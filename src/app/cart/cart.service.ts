import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Item } from '../shared/models/item';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  constructor() {}

  private channel = new Subject < any > ();
  public channel$ = this.channel.asObservable();

  public arrayItems = [];

  public userListObservable: Observable < Array < {
    elem: Item,
    count: number
  } >> = of (this.arrayItems);

  getTotalPrice() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.elem.price * currentValue.count;
    const init = this.arrayItems.reduce(reducer, 0);
    return init;
  }

  getTotalCount() {
    const reducer = (accumulator: number, currentValue) => accumulator + (+currentValue.count);
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

  removeItem(item: {
    elem: Item,
    count: number
  }) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].elem.id === item.elem.id) {
        this.arrayItems.splice(i, 1);
      }
    }
  }

  incrementCount(item: {
    elem: Item,
    count: number
  }) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].elem.id === item.elem.id) {
        this.arrayItems[i].count = +this.arrayItems[i].count + 1;
      }
    }
  }

  decrementCount(item: {
    elem: Item,
    count: number
  }) {
    for (let i = 0; i < this.arrayItems.length; i++) {
      if (this.arrayItems[i].elem.id === item.elem.id) {
        if (this.arrayItems[i].count > 1) {
          this.arrayItems[i].count = +this.arrayItems[i].count - 1;
        } else {
          this.arrayItems.splice(i, 1);
        }
      }
    }
  }

  getUnits(): Observable < {
    elem: Item,
    count: number
  } [] > {
    return this.userListObservable;
  }

  getUnit(id: number | string): Observable < {
    elem: Item,
    count: number
  } > {
    return this.getUnits()
      .pipe(
        map((users: Array < {
          elem: Item,
          count: number
        } > ) => users.find((user: {
          elem: Item,
          count: number
        }) => user.elem.id === +id)),
        catchError(err => throwError('Error in getUnit method'))
      );
  }

  updateUser(user: {
    elem: Item,
    count: number
  }): void {
    const i = this.arrayItems.findIndex(u => u.elem.id === user.elem.id);

    if (i > -1) {
      this.arrayItems.splice(i, 1, user);
    }
  }

}
