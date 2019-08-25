import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-cart-element',
  templateUrl: './cart-element.component.html',
  styleUrls: ['./cart-element.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartElementComponent implements OnInit {
  @Input() item: Item;
  @Output() increment: EventEmitter < Item > = new EventEmitter();
  @Output() decrement: EventEmitter < Item > = new EventEmitter();
  @Output() remove: EventEmitter < Item > = new EventEmitter();

  @Output() editItem = new EventEmitter<any>();

  removeItem(item: Item) {
    this.remove.emit(item);
  }

  incrementCount(item: Item) {
    this.increment.emit(item);
  }

  decrementCount(item: Item) {
    this.decrement.emit(item);
  }

  onEditTtem() {
    this.editItem.emit(this.item);
  }

  ngOnInit() {
  }

}
