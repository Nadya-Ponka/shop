import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Item } from './../../shared/models/item';
import { ProductsAPI } from './../products.config';

@Injectable({
  providedIn: 'root'
})

export class ProductsObservableService {
  constructor(
    private http: HttpClient,
    @Inject(ProductsAPI) private productsBaseUrl: string
  ) {}

  getProducts(): Observable < Item[] > {
    return this.http.get < Item[] > (this.productsBaseUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable < Item > {
    const url = `${this.productsBaseUrl}/${id}`;

    return this.http.get < Item > (url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }


  updateProduct(product: Item): Observable<Item> {
    const url = `${this.productsBaseUrl}/${product.id}`;
    console.log('Продукт для обновления: ', product);
    const body = JSON.stringify(product);

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
          .put<Item>(url, body, options)
          .pipe( catchError(this.handleError) );
  }


  createProduct(product: Item): Observable < Item > {
    const url = this.productsBaseUrl;

    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post < Item > (url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
