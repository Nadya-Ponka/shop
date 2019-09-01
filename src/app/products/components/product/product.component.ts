import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { Item } from '../../../shared/models/item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  
  constructor(private router: Router) {}

  @Input() item: Item;
  @Input() logged: boolean;

  @Output() buyProduct: EventEmitter < Item > = new EventEmitter();
  @Output() showReviews = new EventEmitter < Item > ();
  @Output() editProduct = new EventEmitter < Item > ();

  onBuy(item: Item) {
    console.log('Congratulation! Product was bought!', item);
    this.buyProduct.emit(item);
  }

  ngOnInit() {}

  onShowReviews() {
    console.log('Item for Review From Product Component: ', this.item);
    this.router.navigate([{
      outlets: {
        review: null
      }
    }]);
    setTimeout(() => {
      this.showReviews.emit(this.item);
    }, 50);
  }

  onEditProduct() {
    this.editProduct.emit(this.item);
  }
}
