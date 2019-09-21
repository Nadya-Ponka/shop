/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Item } from '../../../shared/models/item';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Application should create ProductComponent', (done: DoneFn) => {
		expect(component).toBeTruthy();
		done();
	});
	
	it('should create', (done: DoneFn) => {
    const comp = new ProductComponent();
		const item: Item = {id:1,size: ["s","m","l"],colors: ["green","red","yellow"],image: "t-shirt",name: "T-shirt",price:6.99,category: 0,reviews: ["Trop grand. Je fais 1m68 pour 63kg et du F en bonnet de soutien gorge. Les bretelles trop longues !! Je ne rentre pas dans du 36 habituellement, pour les filles un conseil, prenait la 1 voir 2 tailles en dessous. Je l es renvoyer. Sur moi il rendait large pas aimé du tout.",
			"La qualité du tissus est amazing ! Doux et précieux , la dentelle est aussi très jolie, les bretelles du haut ne sont pas super longues ( comme dans les autres débardeurs de ce types) donc on ne verra pas vos seins ( ouf )."
		]};

		comp.item = item;

    comp.editProduct.subscribe(d => {
      expect(d).toBe(item);
      done();
    });
    comp.onEditProduct();
  });
});
 */