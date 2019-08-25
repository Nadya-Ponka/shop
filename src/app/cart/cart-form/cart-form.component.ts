import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

// rxjs
import { Subscription } from 'rxjs';

import { CartService } from './../cart.service';
import { Item } from './../../shared/models/item';

@Component({
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})

export class CartFormComponent implements OnInit, OnDestroy {
  item: { elem: Item, count: number };
  originalUnit: { elem: Item, count: number };

  private sub: Subscription;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // we should recreate component because this code runs only once
    const id = +this.route.snapshot.paramMap.get('userID');
    this.sub = this.cartService.getUnit(id)
      .subscribe(
        item => {
          this.item = {...item};
          this.originalUnit = {...item};
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSaveUser() {
    const item = {...this.item};

    if (item.elem.id) {
      this.cartService.updateUser(item);
      console.log('NAVIGATE');
      this.router.navigate(['/cart', {editedUnitID: item.elem.id}]);
    } else {
      this.onGoBack();
    }
    this.originalUnit = {...this.item};
  }

  onGoBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});
  }
}
