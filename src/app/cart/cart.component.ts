import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Item } from '../shared/models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  ngOnInit() {}
}
