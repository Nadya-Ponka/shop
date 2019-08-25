import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { Item } from './../../shared/models/item';
import { ProductsService } from '../services/products-service.service';
import { ProductsModule } from '../products.module';

@Injectable({
  providedIn: ProductsModule
})
export class ProductResolveGuard implements Resolve<Item> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Item | null> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('productID')) {
      return of(new Item());
    }

    const id = +route.paramMap.get('productID');

    return this.productsService.getUser(id).pipe(
      map((user: Item) => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/admin/product/edit']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return of(null);
      })
    );
  }
}
