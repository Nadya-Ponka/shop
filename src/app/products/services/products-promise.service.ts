import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item } from '../../shared/models/item';

@Injectable({
  providedIn: 'root'
})

export class ProductsPromiseService {
  private productsListUrl = 'http://localhost:3100/productsList';

  constructor(private http: HttpClient) {}

  getProducts(): Promise<Item[]> {
    return this.http
      .get(this.productsListUrl)
      .toPromise()
      .then(response => response as Item[])
      .catch(this.handleError);
  }

  getProduct(id: number): Promise<Item> {
    const url = `${this.productsListUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => {
				console.log('RESPONSE: ', response);
				return response as Item
			})
      .catch(this.handleError);
	}

	updateProduct(product: Item): Promise<Item> {
    const url = `${this.productsListUrl}/${product.id}`;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => {
				console.log('updatedProduct: ', response);
				return response as Item;
			})
      .catch(this.handleError);
	}
	
	createProduct(product: Item): Promise<Item> {
    const url = this.productsListUrl;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response as Item)
      .catch(this.handleError);
	}
	
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
