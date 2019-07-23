import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

import {
  Item
} from '../shared/models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor() {}
  @Input() cart: Item;
  @Output() increment: EventEmitter < Item > = new EventEmitter();
  @Output() decrement: EventEmitter < Item > = new EventEmitter();
  @Output() remove: EventEmitter < Item > = new EventEmitter();

  removeItem(item: Item) {
    this.remove.emit(item);
  }

  incrementCount(item: Item) {
    this.increment.emit(item);
  }
  decrementCount(item: Item) {
    this.decrement.emit(item);
  }

  ngOnInit() {}
}
