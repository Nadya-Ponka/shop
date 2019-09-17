import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { AutoUnsubscribe } from './../../../core';
import { switchMap } from 'rxjs/operators';
// @NgRx
import { Store, select } from '@ngrx/store';
import { AppState, selectSelectedProduct, ProductsState, selectProductsState } from './../../../core/@ngrx';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';

import { Item, Element } from './../../../shared/models/item';
import { ProductsObservableService } from '../../services';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
@AutoUnsubscribe()
export class ProductFormComponent implements OnInit, OnDestroy {
  public item: Item;
  productsState$: Observable < ProductsState > ;
  private sub: Subscription;
  private allProducts: Promise < Item[] > ;

  constructor(
    private route: ActivatedRoute,
    private productsObservableService: ProductsObservableService,
    private location: Location,
    private store: Store < AppState >
  ) {}

  ngOnInit() {
    this.productsState$ = this.store.pipe(select(selectProductsState));
    this.sub = this.productsState$.subscribe(productsState => {
      console.log('productsState++++++: ', productsState);
      if (productsState.selectedProduct) {
        this.item = { ...productsState.selectedProduct } as Item;
      } else {
        this.item = new Item(null, [], [], '', '', 0, 0, []);
      }
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('productID');
      if (id) {
        this.store.dispatch(ProductsActions.getProduct({
          productID: +id
        }));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSaveItem() {
    const product = { ...this.item } as Item;

    if (product.id) {
      this.store.dispatch(ProductsActions.updateProduct({
        product
      }));
    } else {
      product.size = typeof product.size === 'string' ? product.size.split(',') : product.size;
      product.colors = typeof product.colors === 'string' ? product.colors.split(',') : product.colors;
      this.store.dispatch(ProductsActions.createProduct({
        product
      }));
    }
  }

  onGoBack() {
    this.location.back();
  }

}
