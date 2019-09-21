import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class LocalStorageService {

  constructor() {}
  public element;

  setItem(key: string, value: object) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`Установен элемент в LocalStorage с ключом ${key}: `, value);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getItemFromLocalstorage(key: string) {
    try {
      this.element = JSON.parse(localStorage.getItem(key));
      console.log('Получен элемент из LocalStorage: ', this.element);
      return this.element;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
      console.log('Удален элемент из LocalStorage');
    } catch (e) {
      console.error('Error removing data from localStorage', e);
    }
  }
}
