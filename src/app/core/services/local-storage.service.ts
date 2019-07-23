import {
  Injectable
} from '@angular/core';


@Injectable()

export class LocalStorageService {

  constructor() {}
  private element: {
    value: string
  };

  setItem(value: string) {
    try {
      localStorage.setItem('LocalStorageService', JSON.stringify(value));
      console.log('Установен элемент в LocalStorage: ', value);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getItem(key: string) {
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
