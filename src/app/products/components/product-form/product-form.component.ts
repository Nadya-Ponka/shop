import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

import { Item } from './../../../shared/models/item';
import { ProductsService, ProductsPromiseService, ProductsObservableService } from '../../services';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private item;
  private sub: Subscription;
  private originalProduct;
  private allProducts;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private productsPromiseService: ProductsPromiseService,
    private productsObservableService: ProductsObservableService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    /*     this.route.data.pipe(pluck('product')).subscribe((product: Item) => {
          this.item = { ...product };
        });
     */
    this.allProducts = this.productsPromiseService.getProducts();
    this.item = new Item({});
    //const id = this.route.snapshot.paramMap.get('productID');

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return params.get('productID') ?
            this.productsPromiseService.getProduct(+params.get('productID'))
            // when Promise.resolve(null) => task = null => {...null} => {}
            :
            Promise.resolve(null);
        }))
      .subscribe(
        product => this.item = {
          ...product
        },
        err => console.log(err)
      );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSaveItem() {
    /*     const product = { ...this.item };
        if (product.id >= 0) {
          const ppp = this.productsObservableService.updateProduct(product);
          console.log('PPP', ppp);
        } else {
          console.log('Product does not exist!');
          let allProducts: number;

          this.productsObservableService.getProducts().pipe(
            map((users: Item[]) => allProducts = users.length),
            take(1),
            catchError(() => {
              this.router.navigate(['/products']);
              // catchError MUST return observable
              return of(null);
            })
          );

          product.id = allProducts + 1;
          product.image = 'unknown';
          product.size = product.size.split(',');
          product.colors = product.colors.split(',');
          this.productsService.createProduct(product);
        }
        this.onGoBack(); */
    const product = {
      ...this.item
    };
    console.log('New product: ', product);
    const method = product.id >= 0 ? 'updateProduct' : 'createProduct';

    if (!(product.id >= 0)) {
      product.id = this.allProducts.length + 1;
      product.image = 'unknown';
      product.size = product.size.split(',');
      product.colors = product.colors.split(',');
    }

    this.sub = this.productsObservableService[method](product)
      .subscribe(
        savedProduct => {
          /* 
                    this.originalProduct = { ...savedProduct };
                    product.id
                      ? this.router.navigate(['products', { editedProductID: product.id }])
                      :  */
          this.onGoBack();
        },
        error => console.log(error)
      );

  }

  onGoBack() {
    this.location.back();
    /*     this.router.navigate(['/home']);
     */
  }

}
