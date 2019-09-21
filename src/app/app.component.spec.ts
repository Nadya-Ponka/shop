import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { RouterLinkStubDirective, RouterOutletStubComponent } from './testing-helpers';
import { AppComponent } from './app.component';
import { AppSettingsService } from './core/services/app-settings.service';
import { SpinnerService } from './widgets';

let fixture: ComponentFixture<AppComponent>;
let links: RouterLinkStubDirective[];
 let linkDes: DebugElement[];
let component: AppComponent;
let de: DebugElement, el: HTMLElement;
let appSettingsService: AppSettingsService;
let spinnerService: SpinnerService;

const AppSettingsServiceStub = {
	appSettings: {
	id: 'Default-Shop',
	title: 'Hello, World!',
	name: 'Default-Shop'
	},
	loadFromLocalstorage: () => {},
};

const SpinnerServiceStub = {isVisible: () => {}};

@Component({ selector: 'app-spinner', template: '' })
class SpinnerComponent {}

describe('AppComponent', () => {

	beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SpinnerComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
			],
			providers: [
        AppComponent,
				{ provide: AppSettingsService, useValue: AppSettingsServiceStub },
				{ provide: SpinnerService, useValue: SpinnerServiceStub }
      ]
	
		});
		
		fixture = TestBed.createComponent(AppComponent);

		component = TestBed.get(AppComponent);
		appSettingsService = TestBed.get(AppSettingsService);
		spinnerService = TestBed.get(SpinnerService);

    // Запускаем первоначальную инициализацию и получаем экземпляры директив навигации
    fixture.detectChanges();

    // Находим DebugElements с помощью директивы RouterLinkStubDirective
    // Для поиска можно использовать не только By.css, но и By.directive
    // Также искать можно не только по директиве, но и по компоненту,
    // используя его класс
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    // Получаем экземплры директив с помощью DebugElement инжектора
    // Ангуляр всегда добавляет директивы к инжектору компонента
    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
		);
	});
	
	beforeEach(() => {
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
	});
	
  it('should create the app', () => {
    expect(component).toBeDefined();
  });

  it('should have no title in the DOM until manually call `detectChanges`', () => {
    // TestBed.createComponent не вызывает автоматически обнаружение изменений
    expect(el.textContent).toEqual('Made by Nadya Ponkratova');
  });

  it('should display original title', () => {
    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // (change detection) и передать данные из класса в темплейт
    fixture.detectChanges();

    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    // Изменяем свойство title компонента
    component.title = 'Shop: Angular 8';

    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // но уже после того, как проинициализировали свойство компонента новым значением
    fixture.detectChanges();

    expect(el.textContent).toContain('Shop: Angular 8');
	}); 
	
	it('can get RouterLinks from template', () => {
    expect(links.length).toBe(4, 'should have 4 links');
    expect(links[0].linkParams).toBe(
      '/home',
      '1st link should go to ProductsList'
    );
    expect(links[1].linkParams).toBe('/cart', '2nd link should go to Cart');
  });

  it('can click Products link in template', () => {
    const productLinkDe = linkDes[0],
      productLink = links[0];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/home');
	});
	
  it('should ask user to log in if not logged in after ngOnInit', () => {
    appSettingsService.appSettings.id = 'Default-Shop';
    component.ngOnInit();
    expect(component.title).not.toContain(appSettingsService.appSettings.id);
    expect(component.title).toContain('Nadya');
  });
});
