import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appBorder]'
})

export class BorderDirective {

  constructor(private el: ElementRef, private render: Renderer2) {}

  @Input('appBorder') border: string;

  bordered(border: string) {
    this.render.setStyle(this.el.nativeElement, 'border', border);
  }

  @HostListener('click')
  onClick() {
    console.log('We make border by clicking!');
    this.bordered(this.border);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.bordered(null);
  }

}
