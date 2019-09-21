import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CartService } from './../cart.service';
import { Item } from '../../shared/models/item';
import { OrderByPipe } from './../../shared/pipes/order-by.pipe';

@Component({
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  providers: [OrderByPipe]
})

export class CartListComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
		private route: ActivatedRoute,
		private orderByPipe: OrderByPipe
  ) {}

  public totalPrice: number;
  public totalCount: number;

  arrayItems$: Observable < Array < { elem: Item, count: number } >> ;

  private editedUnit: { elem: Item, count: number };

  private sub: Subscription;
	private date = Date.now();
  private keys: string[] = ['name', 'price', 'count'];
  private flag = true;
	private field = '';
	
  removeItem(item: { elem: Item, count: number } ) {
    this.cartService.removeItem(item);
    this.getInfo();
  }

  incrementCount(item: { elem: Item, count: number } ) {
    this.cartService.incrementCount(item);
    this.getInfo();
  }

  decrementCount(item: { elem: Item, count: number } ) {
    this.cartService.decrementCount(item);
    this.getInfo();
  }

  emptyCart() {
    const arr = Object.assign(this.arrayItems$);
    arr.value.forEach((item) => this.cartService.removeItem(item));
    this.cartService.removeItem(arr.value[0]);
    this.getInfo();
  }

  onEditItem(item: { elem: Item, count: number } ) {
    const link = ['/cart/edit', item.elem.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
	}
	
	printField(event: any, array) {
    this.field = event.target.value;
    this.arrayItems$ = this.orderByPipe.transform(array, this.field, this.flag);
  }

  printFlag(event: any, array) {
    this.flag = event.target.value === 'Ascending' ? false : true;
    this.arrayItems$ = this.orderByPipe.transform(array, this.field, this.flag);
	}
	
  private getInfo() {
    this.totalCount = this.cartService.getTotalCount();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {
/* 		this.arrayItems = this.orderByPipe.transform(data, this.field, this.flag);
 */
    this.arrayItems$ = this.cartService.getUnits();
    this.getInfo();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.cartService.getUnit(+params.get('editedUnitID')))
      )
      .subscribe(
        (item) => {
          this.editedUnit = { ...item };
          console.log(`Last time you edited unit: ${JSON.stringify(this.editedUnit)}`);
        },
        err => console.log(err)
      );
  }

  isEdited(unit): boolean {
    if (this.editedUnit.elem && this.editedUnit.elem.id) {
      return unit.elem.id === this.editedUnit.elem.id;
    }
    return false;
}

}
