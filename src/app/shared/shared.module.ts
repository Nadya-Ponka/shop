import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { BorderDirective } from './directives/border.directive';
import { OrderByPipe } from './pipes/order-by.pipe';

const dirs = [HighlightDirective, BorderDirective];

@NgModule({
 declarations: [...dirs, OrderByPipe],
 imports: [CommonModule],
 exports: [...dirs]
})
export class SharedModule {}
