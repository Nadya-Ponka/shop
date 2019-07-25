import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { BorderDirective } from './directives/border.directive';

const dirs = [HighlightDirective, BorderDirective];
@NgModule({
  declarations: [...dirs],
  imports: [CommonModule],
  exports: [...dirs]
})
export class SharedModule {}
