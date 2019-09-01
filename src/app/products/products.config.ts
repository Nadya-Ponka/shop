import { InjectionToken } from '@angular/core';

const productsBaseUrl = 'http://localhost:3100/productsList';
export const ProductsAPI = new InjectionToken<string>('ProductsAPI');

export const ProductsAPIProvider = {
    provide: ProductsAPI,
    useValue: productsBaseUrl
};
