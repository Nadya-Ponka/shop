import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '../../../shared/models/item';
import { ProductsService } from '../../services/products-service.service';
import { CartService } from '../../../cart/cart.service';

import { AuthService } from './../../../core';

import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService,
    public authService: AuthService,
  ) {}

  @Output() buyProduct: EventEmitter < Item > = new EventEmitter();

  items: Observable<Array<Item>>;

  onBuy($event) {
    console.log('Product was bought: ', $event, this.cartService);
    this.buyProduct.emit($event);
    this.cartService.pushItem($event);
  }

  onShowReviews(product: Item): void {
    // Была какая-то проблема, если не выполнять обнуление?
    this.router.navigate([{
      outlets: {
        review: null
      }
    }]);
    this.router.navigate([{
      outlets: {
        review: ['product', product.id]
      }
    }]);
  }

  onEditProduct(product: Item): void {
    const link = ['/admin/product/edit', product.id];
    this.router.navigate(link);
  }

  onCreateProduct() {
    const link = ['/admin/products/add'];
    this.router.navigate(link);
  }

  ngOnInit() {
   this.items = this.productsService.getProducts();
  }

  ngAfterViewInit() {}
}
