import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';

import { Item } from './../../components/product-list-component/item';
import { ProductsServiceService } from './../../services/products-service.service';
import { CartService } from './../../../cart/cart.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit, AfterViewInit {
  constructor(
    private ProductsService: ProductsServiceService,
    private cartService: CartService
  ) {}

  @Output() buyProduct: EventEmitter<Item> = new EventEmitter();

  items: Array<Item>;

  //  Не стоит использовать стрелочные функции в качестве методов
  onBuy($event: any) {
    console.log('Пришел товар из дочернего компонента: ', $event);
    this.buyProduct.emit($event);
    this.cartService.pushItem($event);
  };
  ngOnInit() {
    this.items = this.ProductsService.getProducts();
  }

  transferTitle = () => {
    return 'Made by Nadya Ponkratova';
  };
  ngAfterViewInit() {}
}
