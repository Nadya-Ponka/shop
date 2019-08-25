import { Injectable } from '@angular/core';

import { Item } from '../../shared/models/item';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const productsList = [
  new Item(1, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 't-shirt', 't-shirt', 5, 0, [
  `Trop grand. Je fais 1m68 pour 63kg et du F en bonnet de soutien gorge. Les bretelles trop longues !!
  Je ne rentre pas dans du 36 habituellement, pour les filles un conseil, prenait la 1 voir 2 tailles en dessous.
  Je l es renvoyer. Sur moi il rendait " large" pas aimé du tout.`,
  `La qualité du tissus est amazing ! Doux et précieux , la dentelle est aussi très jolie ,
  les bretelles du haut ne sont pas super longues ( comme dans les autres débardeurs de ce types)
  donc on ne verra pas vos seins ( ouf ).`
  ]),
  new Item(2, ['10Litry'], ['green', 'red', 'yellow'], 'backpack', 'backpack', 5.95, 1, [
    `Magnifique petit caraco . Tres belle couleur, Rendu qualitatif et chic. Acheté en taille 32,
		j'ai dû neanmoins retoucher les bretelles qui étaient trop longues!`
  ]),
  new Item(3, ['M', 'XL', 'XXL'], ['grey', 'blue'], 't-shirt-1', 't-shirt', 19.95, 1),
  new Item(4, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 'jacket', 'jacket', 25, 0),
  new Item(5, ['s', 'm', 'l'], ['blue', 'red', 'yellow'], 'jacket', 'Jacket', 51, 0, [
    `Très joli caraco mais d’une fragilité impressionnante. Après l’avoir porté une journée,
		le tissu est « griffé » un peu partout`,
    `Le top taille bien sauf au niveau des bretelles qui me sont légèrement trop grandes.
		Mais je ne regrette pas de mon achat !`
  ]),
  new Item(6, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 't-shirt', 'T-shirt', 5, 0),
  new Item(7, ['10Litry'], ['green', 'red', 'yellow'], 'backpack', 'backpack', 5.95, 0),
  new Item(8, ['s', 'm', 'l'], ['green', 'red', 'yellow'], 'jacket', 'jacket', 15, 0)
];

const productsListPromise = Promise.resolve(productsList);
const userListObservable: Observable < Array < Item >> = of (productsList);

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor() {}

  getProducts(): Promise < Item[] > {
    return productsListPromise;
  }

  getProduct(id: number | string): Promise < Item > {
    return this.getProducts()
      .then(products => products.find(product => product.id === +id))
      .catch(() => Promise.reject('Error in getProduct method'));
  }

  getUsers(): Observable < Item[] > {
    return userListObservable;
  }

  getUser(id: number | string): Observable < Item > {
    return this.getUsers()
      .pipe(
        map((users: Array < Item > ) => users.find(user => user.id === +id)),
        catchError(err => throwError('Error in getUser method'))
      );
  }

  createProduct(product: Item): void {
    productsList.push(product);
  }

  updateProduct(product: Item): void {
    const i = productsList.findIndex(t => t.id === product.id);

    if (i > -1) {
      productsList.splice(i, 1, product);
    }
  }

  deleteProduct(product: Item): void {
    const i = productsList.findIndex(t => t.id === product.id);

    if (i > -1) {
      productsList.splice(i, 1);
    }
  }

}
