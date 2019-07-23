import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';

@Directive({
 selector: '[appHighlight]',
})
export class HighlightDirective {
 constructor(el: ElementRef) {
 this.el = el.nativeElement;
 }

 @Input('appHighlight') color: string;
 private el: HTMLElement;

 highlight(color: string) {
  this.el.style.backgroundColor = color;
 }

 @HostListener('mouseenter')
 onMouseEnter() {
  console.log('We are above the element!');
  this.highlight(this.color || 'lightgreen');
 }
 @HostListener('mouseleave')
 onMouseLeave() {
  this.highlight(null);
 }
}
