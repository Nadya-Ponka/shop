import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '../../../shared/models/item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  constructor() {}

	@Input() item: Item;
	@Input() size: [];
	@Input() colors: [];

  @Input() logged: boolean;

  @Output() buyProduct: EventEmitter < Item > = new EventEmitter();
  @Output() showReviews = new EventEmitter < Item > ();
  @Output() editProduct = new EventEmitter < Item > ();

  onBuy(item: Item) {
    console.log('Congratulation! Product was bought!', item);
    this.buyProduct.emit(item);
  }

  ngOnInit() {
	}

  onShowReviews() {
    console.log('Item for Review From Product Component: ', this.item);
    this.showReviews.emit(this.item);
  }

  onEditProduct() {
    this.editProduct.emit(this.item);
  }
}
