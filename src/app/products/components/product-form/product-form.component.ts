import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Item } from './../../../shared/models/item';
import { ProductsPromiseService, ProductsObservableService } from '../../services';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit, OnDestroy {
  public item: Item;

  private sub: Subscription;
  private allProducts: Promise<Item[]>;

  constructor(
    private route: ActivatedRoute,
    private productsPromiseService: ProductsPromiseService,
    private productsObservableService: ProductsObservableService,
    private location: Location
  ) {}

  ngOnInit() {
    this.allProducts = this.productsPromiseService.getProducts();
    this.item = new Item( null, [], [], '', '', 0, 0, [] );

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
    const product = {...this.item};
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
          this.onGoBack();
        },
        error => console.log(error)
      );
  }

  onGoBack() {
    this.location.back();
  }

}
