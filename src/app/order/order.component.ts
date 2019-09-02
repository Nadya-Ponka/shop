import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { CartService } from './../cart/cart.service';
import { Item } from '../shared/models/item';
import { OrderService } from './../order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) { }
  
  arrayItems$: Observable < Array < { elem: Item, count: number } >> ;
  
  public items: { elem: Item, count: number }[];
  public showThanks = false;
  public totalCount: number;
  public totalPrice: number;
  public user: {};

  private sub: Subscription;

  ngOnInit() {
    this.user = {
      firstName: '',
      lastName: '',
      address: ''
    };
    this.arrayItems$ = this.cartService.getUnits();
    this.arrayItems$.pipe(take(1)).subscribe(value =>  this.items = value);
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalCount = this.cartService.getTotalCount();
  }

  onConfirm() {
    this.showThanks = true;

    const order = {
      user: this.user,
      order: this.items
    };
    this.orderService.saveOrder(order);
  }

  onGoCart() {
    this.showThanks = false;
    const link = ['/cart'];
    this.router.navigate(link);
  }

  onGoBack() {
    this.showThanks = false;
    const link = ['/home'];
    this.router.navigate(link);
  }

}
