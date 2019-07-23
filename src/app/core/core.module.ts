import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  AboutComponent
} from './layout/components/about/about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AboutComponent
  ]
})

export class CoreModule {}
