import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from './../router';

import { ProductsState } from './products.state';
import { Item } from './../../../shared/models/item';

export const selectProductsState = createFeatureSelector < ProductsState > ('products');
export const selectProductsData = createSelector(selectProductsState, (state: ProductsState) => state.data);
export const selectSelectedProduct = createSelector(selectProductsState, (state: ProductsState) => state.selectedProduct);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);
export const selectSelectedProductByUrl = createSelector(
  selectProductsData,
  selectRouterState,
  (products, router): Item => {
    const productID = router.state.params.productID;
    if (productID && Array.isArray(products)) {
      return products.find(product => product.id === +productID);
    } else {
      return new Item(null, [], [], '', '', 0, 0, []);
    }
  });
