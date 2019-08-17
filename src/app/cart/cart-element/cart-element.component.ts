import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cart-element',
  templateUrl: './cart-element.component.html',
  styleUrls: ['./cart-element.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
