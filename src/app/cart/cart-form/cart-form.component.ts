import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

// rxjs
import { Subscription } from 'rxjs';

import { Item } from './../../shared/models/item';
import { CartService } from './../cart.service';

/*import { UserArrayService } from './../../services/user-array.service';
 */
@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})

export class CartFormComponent implements OnInit, OnDestroy {
  user: Item;
  originalUser: Item;

  private sub: Subscription;

  constructor(
    private cartService: CartService,
/*     private userArrayService: UserArrayService,
 */    private route: ActivatedRoute,
  private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new Item(/* null, '', '' */);

    // we should recreate component because this code runs only once
    const id = +this.route.snapshot.paramMap.get('userID');
    this.sub = this.cartService.getUser(id)
      .subscribe(
        user => {
          this.user = {...user};
          this.originalUser = {...user};
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSaveUser() {
    const user = {...this.user};

    if (user.id) {
      this.cartService.updateUser(user);
    } else {
      this.cartService.createUser(user);
    }
    this.originalUser = {...this.user};
    this.onGoBack();
  }

  onGoBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});
  }
}
