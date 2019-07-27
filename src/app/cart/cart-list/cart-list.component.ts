import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from './../cart.service';
import { Item } from '../../shared/models/item';

import { OrderByPipe } from './../../shared/pipes/order-by.pipe';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  providers: [OrderByPipe]
})
export class CartListComponent implements OnInit, OnDestroy {
  constructor(private CartComponentService: CartService, private orderByPipe: OrderByPipe) {}
  public totalPrice: number;
  public totalCount: number;
	arrayItems: Array < any > = [];

	private sub: Subscription;
  private date = Date.now();
  private keys: string[] = ['name', 'price', 'count'];
  private flag = true;
  private field = '';

  removeItem(item: { elem: Item, count: number }) {
    this.CartComponentService.removeItem(item);
    this.totalCount = this.CartComponentService.getTotalCount();
    this.totalPrice = this.CartComponentService.getTotalPrice();
  }

  incrementCount(item: { elem: Item, count: number }) {
    this.CartComponentService.incrementCount(item);
    this.totalCount = this.CartComponentService.getTotalCount();
    this.totalPrice = this.CartComponentService.getTotalPrice();
	}
	
  decrementCount(item: { elem: Item, count: number }) {
    this.CartComponentService.decrementCount(item);
    this.totalCount = this.CartComponentService.getTotalCount();
    this.totalPrice = this.CartComponentService.getTotalPrice();
  }

  emptyCart() {
    this.CartComponentService.emptyCart();
  }

  printField(event: any) {
    this.field = event.target.value;
    this.arrayItems = this.orderByPipe.transform(this.arrayItems, this.field, this.flag);
  }

  printFlag(event: any) {
    this.flag = event.target.value === 'Ascending' ? false : true;
    this.arrayItems = this.orderByPipe.transform(this.arrayItems, this.field, this.flag);
  }

  ngOnInit() {
    this.sub = this.CartComponentService.channel$.subscribe(
      data => {
        this.arrayItems = this.orderByPipe.transform(data, this.field, this.flag);
        this.totalPrice = this.CartComponentService.getTotalPrice();
        this.totalCount = this.CartComponentService.getTotalCount();
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
