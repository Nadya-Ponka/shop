import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor() {}

  public orders = [];

  private orderID = 0;
  private element: {
    value: string
  };

  saveOrder(order) {
    console.log('Get new order: ', order);
    order.id = this.orderID;
    this.orders.push(order);
    this.orderID += 1;

    try {
      localStorage.setItem('Nadya_Shop', JSON.stringify(this.orders));
      console.log('Установен элемент в LocalStorage: ', this.orders);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }

  }

  getOrders(key: string) {
    try {
      this.element = JSON.parse(localStorage.getItem(key));
      console.log('Получен элемент из LocalStorage: ', this.element);
      return this.element;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}
