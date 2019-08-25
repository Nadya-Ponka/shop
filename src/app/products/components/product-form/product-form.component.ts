import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { pluck } from 'rxjs/operators';

import { Item } from './../../../shared/models/item';
import { ProductsService } from '../../services/products-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
/*     this.item = new Item();

    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => this.productsService.getProduct(+params.get('productID'))))
    .subscribe(
      task => {
        console.log('TASK: ', task);
        this.item = {...task}},
      err => console.log(err)
  );
 */

this.route.data.pipe(pluck('product')).subscribe((product: Item) => {
  this.item = { ...product };
/*   this.originalUser = { ...user };
 */});

  }

  onSaveItem() {
    const product = { ...this.item };
    console.log('Edit new Product: ', product);

    if (product.id) {
      this.productsService.updateProduct(product);
    } else {
      console.log('Product does not exist!');
      let allProducts: number;
      this.productsService.getProducts().then(array => {
      allProducts = array.length;
      product.id = allProducts + 1;
      product.image = 'unknown';
      product.size = product.size.split(',');
      product.colors = product.colors.split(',');
      this.productsService.createProduct(product);
      });
    }
    this.onGoBack();
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }
}
