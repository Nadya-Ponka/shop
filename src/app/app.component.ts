import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {ProductListComponentComponent} from './products/components/product-list-component/product-list-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
 @ViewChild('appTitle', {static: false})
 title: ElementRef<HTMLElement>;

 @ViewChild(ProductListComponentComponent, {static: false})
 child: ProductListComponentComponent;

 ngAfterViewInit() {
  this.title.nativeElement.innerHTML = this.child.transferTitle();
 }
}
