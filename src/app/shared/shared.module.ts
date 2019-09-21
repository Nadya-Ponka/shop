import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { BorderDirective } from './directives/border.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';

const dirs = [HighlightDirective, BorderDirective];

@NgModule({
 declarations: [...dirs, OrderByPipe, PathNotFoundComponent],
 imports: [CommonModule],
 exports: [...dirs, OrderByPipe, PathNotFoundComponent]
})
export class SharedModule {}
