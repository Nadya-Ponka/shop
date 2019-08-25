import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { CartService } from './../cart/cart.service';
import { Item } from '../shared/models/item';
import { UserModel } from './models/order.model';
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
    private route: ActivatedRoute,
  ) { }

  public totalPrice: number;
  public totalCount: number;

  arrayItems$: Observable < Array < { elem: Item, count: number } >> ;

  private user: {};
  private items;

  private sub: Subscription;
  private showThanks = false;

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
