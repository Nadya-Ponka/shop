import { TestBed } from '@angular/core/testing';

import { Item } from '../../shared/models/item';
import { ProductsService } from './products-service.service';

describe('ProductsService', () => {
	let service: ProductsService;

  beforeEach(() => { 
		service = new ProductsService();
	}
	);

  it('should be created', () => {
    expect(service).toBeTruthy();
	});
	
	it('getObservableValue should return observable value', (done: DoneFn) => {
    service.getProducts().subscribe(value => {
      expect(value).toBeTruthy( < Item[] >[]);
      done();
    });
	});
	
	it('get first element from db', (done: DoneFn) => {
		const firstElement = {id:1,size:["s","m","l"],colors: ["green","red","yellow"],image: "t-shirt",name: "T-shirt",price:6.99,category:0,reviews:["Trop grand. Je fais 1m68 pour 63kg et du F en bonnet de soutien gorge. Les bretelles trop longues !! Je ne rentre pas dans du 36 habituellement, pour les filles un conseil, prenait la 1 voir 2 tailles en dessous. Je l es renvoyer. Sur moi il rendait large pas aimé du tout.","La qualité du tissus est amazing ! Doux et précieux , la dentelle est aussi très jolie, les bretelles du haut ne sont pas super longues ( comme dans les autres débardeurs de ce types) donc on ne verra pas vos seins ( ouf )."]};
    service.getProduct(1).subscribe(value => {
      expect(value).toBeTruthy(<Item>firstElement);
      done();
    });
	});
	
	/* it('get first element from db', (done: DoneFn) => {
		const firstElement = {id:1,size:["s","m","l"],colors: ["green","red","yellow"],image: "t-shirt",name: "T-shirt",price:6.99,category:0,reviews:["Trop grand. Je fais 1m68 pour 63kg et du F en bonnet de soutien gorge. Les bretelles trop longues !! Je ne rentre pas dans du 36 habituellement, pour les filles un conseil, prenait la 1 voir 2 tailles en dessous. Je l es renvoyer. Sur moi il rendait large pas aimé du tout.","La qualité du tissus est amazing ! Doux et précieux , la dentelle est aussi très jolie, les bretelles du haut ne sont pas super longues ( comme dans les autres débardeurs de ce types) donc on ne verra pas vos seins ( ouf )."]};
    service.getProduct(1).subscribe(value => {
      expect(<Item>value).toEqual(<Item>firstElement);
      done();
    });
  }); */
});
