import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';

import { pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { Item } from './../../../shared/models/item';
import { ProductsService } from '../../services/products-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  private item;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.pipe(pluck('product')).subscribe((product: Item) => {
      this.item = { ...product };
    });
  }

  onSaveItem() {
    const product = { ...this.item };

    if (product.id) {
      this.productsService.updateProduct(product);
    } else {
      console.log('Product does not exist!');
      let allProducts: number;

      this.productsService.getProducts().pipe(
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
    this.onGoBack();
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }
}
