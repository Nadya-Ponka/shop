import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';

import {
  Item
} from '../../../shared/models/item';
import {
  ProductsService
} from '../../services/products-service.service';
import {
  CartService
} from '../../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(
    private productsService: ProductsService,
    private cartService: CartService) {}

  @Output() buyProduct: EventEmitter < Item > = new EventEmitter();

  items;

  onBuy($event) {
    this.buyProduct.emit($event);
    this.cartService.pushItem($event);
  }
  ngOnInit() {
    this.items = this.productsService.getProducts();
  }

  transferTitle() {
    return 'Made by Nadya Ponkratova';
  }
  ngAfterViewInit() {}
}
