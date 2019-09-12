import { Element } from '../../../shared/models/item';

export interface ProductsState {
	data: ReadonlyArray<Element>;
	readonly loading: boolean;
  readonly loaded: boolean;
	readonly error: Error | string;
	selectedProduct: Readonly<Element>;
}

export const initialProductsState: ProductsState = {
    data: [],
    loading: false,
    loaded: false,
		error: null,
		selectedProduct: null
};
