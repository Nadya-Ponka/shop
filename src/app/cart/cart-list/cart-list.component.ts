import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(
    private cartService: CartService, 
    private orderByPipe: OrderByPipe,
    private router: Router,
    private route: ActivatedRoute
) {
  }
  public totalPrice: number;
  public totalCount: number;
	arrayItems = [];

	private sub: Subscription;
  private date = Date.now();
  private keys: string[] = ['name', 'price', 'count'];
  private flag = true;
  private field = '';

  removeItem(item: { elem: Item, count: number }) {
    this.cartService.removeItem(item);
    this.totalCount = this.cartService.getTotalCount();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  incrementCount(item: { elem: Item, count: number }) {
    this.cartService.incrementCount(item);
    this.totalCount = this.cartService.getTotalCount();
    this.totalPrice = this.cartService.getTotalPrice();
	}
	
  decrementCount(item: { elem: Item, count: number }) {
    this.cartService.decrementCount(item);
    this.totalCount = this.cartService.getTotalCount();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  emptyCart() {
    this.cartService.emptyCart();
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
    this.arrayItems = this.cartService.arrayItems;
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalCount = this.cartService.getTotalCount();
    
    /* this.sub = this.cartService.channel$.subscribe(
      data => {
        console.log('Получили элемент: ', data);
        this.arrayItems = this.orderByPipe.transform(data, this.field, this.flag);
        this.totalPrice = this.cartService.getTotalPrice();
        this.totalCount = this.cartService.getTotalCount();
      }
    ); */
  }
  onEditItem(user: Item) {
    console.log('FROM LIST COMPONENT: ', user);
    const link = ['/cart/edit', user.elem.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

  ngOnDestroy() {
/*     this.sub.unsubscribe();
 */  }
}
