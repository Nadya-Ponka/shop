import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CartService } from './../cart.service';
import { Item } from '../../shared/models/item';

@Component({
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  providers: []
})

export class CartListComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public totalPrice: number;
  public totalCount: number;

  arrayItems$: Observable < Array < { elem: Item, count: number } >> ;

  private editedUnit: { elem: Item, count: number };

  private sub: Subscription;

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

  private getInfo() {
    this.totalCount = this.cartService.getTotalCount();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {
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
