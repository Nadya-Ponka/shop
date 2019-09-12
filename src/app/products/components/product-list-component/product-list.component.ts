import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectProductsData, selectProductsError  } from './../../../core/@ngrx';

// rxjs
import { Observable } from 'rxjs';

import { Item } from '../../../shared/models/item';
import { ProductsService } from '../../services';
import { CartService } from '../../../cart/cart.service';
import { AuthService } from './../../../core';

import * as ProductsActions from './../../../core/@ngrx/products/products.actions';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService,
		public authService: AuthService,
		private store: Store<AppState>
  ) {}

  @Output() buyProduct: EventEmitter < Item > = new EventEmitter();

	products$: Observable<ReadonlyArray<Item>>;
	productsError$: Observable<Error | string>;
	
  onBuy($event) {
    console.log('Product was bought: ', $event, this.cartService);
    this.buyProduct.emit($event);
    this.cartService.pushItem($event);
  }

  onShowReviews(product: Item): void {
		console.log('REVIEW: ', product);
    this.router.navigate([{
      outlets: {
        review: ['product', product.id]
      }
    }]);
  }

  onEditProduct(product: Item): void {
    const link = ['/admin/product/edit', product.id];
    this.router.navigate(link);
  }

  onCreateProduct() {
    const link = ['/admin/products/add'];
    this.router.navigate(link);
  }

  ngOnInit() {
/* 		this.productsState$ = this.store.pipe(select('products'));
 */		// this.items = this.productsPromiseService.getProducts();
		this.products$ = this.store.pipe(select(selectProductsData));
		this.productsError$ = this.store.pipe(select(selectProductsError));
		this.store.dispatch(ProductsActions.getProducts());
  }

}
