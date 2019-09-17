import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, map, pluck, switchMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import { ProductsPromiseService } from './../../../products/services';
import { Element, Item } from './../../../shared/models/item';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsPromiseService: ProductsPromiseService,
    private router: Router
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  getProducts$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap(action =>
        this.productsPromiseService
        .getProducts()
        .then(products => ProductsActions.getProductsSuccess({
          products
        }))
        .catch(error => ProductsActions.getProductsError({
          error
        }))
      )
    )
  );

  getProduct$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProduct, ProductsActions.showReview),
      pluck('productID'),
      switchMap(productID =>
        this.productsPromiseService.getProduct(productID)
        .then(product => ProductsActions.getProductSuccess({
          product
        }))
        .catch(error => ProductsActions.getProductError({
          error
        }))
      )
    )
  );

  updateProduct$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      pluck('product'),
      concatMap((product: Item) =>
        this.productsPromiseService.updateProduct(product)
        .then((updatedProduct: Element) => {
          console.log('updatedProduct: ', updatedProduct);
          this.router.navigate(['/home']);
          return ProductsActions.updateProductSuccess({
            product: updatedProduct
          });
        })
        .catch(error => ProductsActions.updateProductError({
          error
        }))
      )
    )
  );

  createProduct$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      pluck('product'),
      concatMap((product: Item) =>
        this.productsPromiseService
        .createProduct(product)
        .then((createdProduct: Element) => {
          this.router.navigate(['/home']);
          return ProductsActions.createProductSuccess({
            product: createdProduct
          });
        })
        .catch(error => ProductsActions.createProductError({
          error
        }))
      )
    )
  );

  showReview$: Observable < Action > = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.showReview),
      pluck('productID'),
      switchMap(productID =>
        this.productsPromiseService.getProduct(productID)
        .then(product => ProductsActions.showReviewSuccess({
          product
        }))
        .catch(error => ProductsActions.showReviewError({
          error
        }))
      )
    )
  );
}
