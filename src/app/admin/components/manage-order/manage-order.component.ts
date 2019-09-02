import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  constructor() { }

  public orders = [];

  ngOnInit() {
    try {
      this.orders = JSON.parse(localStorage.getItem('Nadya_Shop')) || [];
      console.log('Получены заказы из LocalStorage: ', this.orders);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

}
