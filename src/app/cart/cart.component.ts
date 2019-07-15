import { Component, OnInit } from '@angular/core';

// Похоже не хватает части функционала. Проект не запускается, так как нет функционала products
import { Item } from './../products/components/product-list-component/item';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 constructor(private CartComponentService: CartService) {}

 carts: Array<Item>;

 onBuy = () => {
  console.log('Congratulation! Product was bought!');
 }
 ngOnInit() {
  this.carts = this.CartComponentService.getItemsFromCart();
 }
}
