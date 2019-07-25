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
  ProductsServiceService
} from './../../services/products-service.service';
import {
  CartService
} from './../../../cart/cart.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
// может переименовать в ProductListComponent
export class ProductListComponentComponent implements OnInit, AfterViewInit {
  constructor(
    private productsService: ProductsServiceService,
    private cartService: CartService) {}

  @Output() buyProduct: EventEmitter < Item > = new EventEmitter();

  items: Array < Item > ;

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
