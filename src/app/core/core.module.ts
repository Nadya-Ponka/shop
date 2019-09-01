import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './layout/components/about/about.component';
import { appSettingsAPIProvider } from './services/app-settings.config';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AboutComponent
  ],
  providers: [
    appSettingsAPIProvider
  ]
})

export class CoreModule {}
