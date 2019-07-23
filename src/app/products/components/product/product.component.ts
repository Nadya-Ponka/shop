import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../product-list-component/item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() item: Item;
  @Output() buyProduct: EventEmitter<Item> = new EventEmitter();

  //  не стоит использовать стрелочную функцию
  onBuy = (item: Item) => {
    console.log('Congratulation! Product was bought!', this.item);
    this.buyProduct.emit(this.item);
  };

  ngOnInit() {}
}
