import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '../../../shared/models/item';
import { ProductsService } from '../../services/products-service.service';
import { CartService } from '../../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(
		private router: Router,
    private productsService: ProductsService,
    private cartService: CartService) {}

  @Output() buyProduct: EventEmitter < Item > = new EventEmitter();

  items: Promise<Array<Item>>;

  onBuy($event) {
    this.buyProduct.emit($event);
    this.cartService.pushItem($event);
	}
	
	onShowReviews(product: Item): void {
		console.log('PRODUCT: ', product);
		const link = ['/product', product.id];
    this.router.navigate(link);
	}

  ngOnInit() {
    this.items = this.productsService.getProducts();
	}
	
	ngAfterViewInit() {}

	/* items: Promise<Array<Item>>;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.items = this.productsService.getProducts();
  }

  onCompleteProduct(product: Item): void {
    const updatedProduct = { ...product, done: true };
    this.productsService.updateProduct(updatedProduct);
  }

   */
}
