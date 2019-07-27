import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {ProductListComponent} from './products/components/product-list-component/product-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
 @ViewChild('appTitle', {static: false})
 title: ElementRef<HTMLElement>;

 @ViewChild(ProductListComponent, {static: false})
 child: ProductListComponent;

 ngAfterViewInit() {
  this.title.nativeElement.innerHTML = this.child.transferTitle();
 }
}
