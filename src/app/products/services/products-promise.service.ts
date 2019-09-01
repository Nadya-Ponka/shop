import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      .then(response => response as Item)
      .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
