import { createAction, props } from '@ngrx/store';

import { Element } from './../../../shared/models/item';

export const getProducts = createAction(
 '[Products] GET_PRODUCTS'
);

export const getProductsSuccess = createAction(
  '[Products] GET_PRODUCTS_SUCCEESS',
  props<{ products: Element[] }>()
);
export const getProductsError = createAction(
  '[Products] GET_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const getProduct = createAction(
  '[Products] GET_PRODUCT',
  props<{ productID: number }>()
);

export const getProductSuccess = createAction(
  '[Products API] GET_PRODUCT_SUCCESS',
  props<{ product: Element }>()
);

export const getProductError = createAction(
  '[Products API] GET_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const createProduct = createAction(
  '[Products] CREATE_PRODUCT',
  props<{ product: Element }>()
);

export const createProductSuccess = createAction(
  '[Products API] CREATE_PRODUCT_SUCCESS',
  props<{ product: Element }>()
);

export const createProductError = createAction(
  '[Products API] CREATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const updateProduct = createAction(
  '[Products] UPDATE_PRODUCT',
  props<{ product: Element }>()
);

export const updateProductSuccess = createAction(
  '[Products API] UPDATE_PRODUCT_SUCCESS',
  props<{ product: Element }>()
);

export const updateProductError = createAction(
  '[Products API] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);

export const showReview = createAction(
  '[Products] SHOW_REVIEW',
  props<{ productID: number }>()
);

export const showReviewSuccess = createAction(
  '[Products API] SHOW_REVIEW_PRODUCT_SUCCESS',
  props<{ product: Element }>()
);

export const showReviewError = createAction(
  '[Products API] SHOW_REVIEW_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);
