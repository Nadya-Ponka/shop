import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectSelectedProductByUrl, selectProductsState, ProductsState } from './../../../core/@ngrx';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { Item } from '../../../shared/models/item';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';

@Component({
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})

export class ProductReviewsComponent implements OnInit {
  public review: Item;
  private sub: Subscription;
	productsState$: Observable<ProductsState>;

  constructor(
    private route: ActivatedRoute,
		private router: Router,
		private store: Store<AppState>
  ) {}

  ngOnInit(): void {
		this.review = new Item(null, '', '', '', '', 0, 0, []);

		this.productsState$ = this.store.pipe(select(selectProductsState));
    this.sub = this.productsState$.subscribe(productsState => {
			console.log('showReview++++++: ', productsState);
      if (productsState.selectedProduct) {
        this.review = {...productsState.selectedProduct} as Item;
      } else {
        this.review = new Item(null, '', '', '', '', 0, 0, []);
			}
		});

			this.route.paramMap.subscribe((params: ParamMap) => {
				const id = params.get('productID');
				if (id) {
					this.store.dispatch(ProductsActions.showReview({ productID: +id }));
				}
	});
}

  onGoBack(): void {
    this.router.navigate([{
      outlets: {
        review: null
      }
    }]);
  }
}
