import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take, delay, filter, finalize, switchMap } from 'rxjs/operators';

import { Item } from './../../shared/models/item';
import { ProductsService, ProductsObservableService } from '../services';
import { ProductsModule } from '../products.module';
import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: ProductsModule
})
export class ProductResolveGuard implements Resolve<Item> {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private spinner: SpinnerService,
    private productsObservableService: ProductsObservableService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Item | null> {
    console.log('ProductResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(new Item(Math.random() * 1000, [], [], '', '', 0, 0));
    }
    this.spinner.show();
    const id = +route.paramMap.get('productID');

    return this.productsObservableService.getProduct(id).pipe(
      delay(2000),
      map((product: Item) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/admin/product/edit']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/products']);
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
