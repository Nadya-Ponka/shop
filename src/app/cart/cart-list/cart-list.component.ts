import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Subscription
} from 'rxjs';

import {
  CartService
} from './../cart.service';
import {
  Item
} from '../../shared/models/item';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {
  constructor(private CartComponentService: CartService) {}
  private sub: Subscription;
  arrayItems: Array < any > = [];

  public totalPrice: number;
  public totalCount: number;
  /*  onBuy = () => {
    console.log('Congratulation! Product was bought!');
   }
   */
  removeItem(item: {
    elem: Item,
    count: number
  }) {
    this.CartComponentService.removeItem(item);
    this.totalCount = this.CartComponentService.getTotalCount();
    this.totalPrice = this.CartComponentService.getTotalPrice();
  }

  incrementCount(item: {
    elem: Item,
    count: number
  }) {
    this.CartComponentService.incrementCount(item);
    this.totalCount = this.CartComponentService.getTotalCount();
    this.totalPrice = this.CartComponentService.getTotalPrice();
  }
  decrementCount(item: {
    elem: Item,
    count: number
  }) {
    this.CartComponentService.decrementCount(item);
    this.totalCount = this.CartComponentService.getTotalCount();
    this.totalPrice = this.CartComponentService.getTotalPrice();
  }

  inputCount(item: {
    elem: Item,
    count: number
  }) {
    console.log('Input count: ', item);
  }

  ngOnInit() {
    this.sub = this.CartComponentService.channel$.subscribe(
      data => {
        this.arrayItems = data;
        this.totalPrice = this.CartComponentService.getTotalPrice();
        this.totalCount = this.CartComponentService.getTotalCount();
      }
    );
  }

  public emptyCart() {
    this.CartComponentService.emptyCart();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
