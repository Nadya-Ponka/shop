import { Action, createReducer, on } from '@ngrx/store';

import { ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.getProducts, state => {
    console.log('GET_Products action being handled!');
    return {
      ...state,
      loading: true
    };
  }),
  on(ProductsActions.getProductsSuccess, (state, props) => {
    console.log('GET_PRODUCTS_SUCCESS action being handled!');
    const data = [...props.products];
    return {
      ...state,
      data,
      loading: false,
      loaded: true
    };
  }),
  on(ProductsActions.getProductsError, (state, props) => {
    console.log('GET_PRODUCTS_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  on(ProductsActions.getProduct, state => {
    console.log('GET_Product action being handled!');
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),

  on(ProductsActions.getProductSuccess, ProductsActions.showReviewSuccess, (state, props) => {
    console.log('GET_PRODUCT_SUCCESS action being handled!');
    console.log('SELECTED PRODUCT: ', props);

    const selectedProduct = {
      ...props.product
    };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedProduct
    };
  }),

  on(ProductsActions.getProductError, ProductsActions.showReviewError, (state, props) => {
    console.log('GET_PRODUCT_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  on(ProductsActions.createProduct, state => {
    console.log('CREATE_Product action being handled!');
    return {
      ...state
    };
  }),

  on(ProductsActions.createProductSuccess, (state, props) => {
    console.log('CREATE_PRODUCT_SUCCESS action being handled!');
    const product = {
      ...props.product
    };
    const data = [...state.data, product];

    return {
      ...state,
      data
    };
  }),

  on(ProductsActions.createProductError, (state, props) => {
    console.log('CREATE_PRODUCT_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  }),

  on(ProductsActions.updateProduct, state => {
    console.log('UPDATE_Product action being handled!');
    return {
      ...state
    };
  }),

  on(ProductsActions.updateProductSuccess, (state, props) => {
    console.log('UPDATE_PRODUCT_SUCCESS action being handled!');
    const data = [...state.data];
    const product = props.product;

    const index = data.findIndex(t => t.id === product.id);

    data[index] = {
      ...product
    };

    return {
      ...state,
      data
    };
  }),

  on(ProductsActions.updateProductError, (state, props) => {
    console.log('UPDATE_PRODUCT_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  }),

  on(ProductsActions.showReview, state => {
    console.log('Show_Review action being handled!');
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),

  on(ProductsActions.showReviewSuccess, (state, props) => {
    console.log('SHOW_REVIEW_SUCCESS action being handled!');
    console.log('SELECTED PRODUCT: ', props);

    const selectedProduct = {
      ...props.product
    };
    return {
      ...state,
      loading: false,
      loaded: true,
      selectedProduct
    };
  }),

  on(ProductsActions.showReviewError, (state, props) => {
    console.log('GET_PRODUCT_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
