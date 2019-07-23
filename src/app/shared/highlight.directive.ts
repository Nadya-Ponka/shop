import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
 @Input('appHighlight') color: string;
 private el: HTMLElement;

 constructor(el: ElementRef) {
  this.el = el.nativeElement;
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
 private highlight(color: string) {
  this.el.style.backgroundColor = color;
 }
}