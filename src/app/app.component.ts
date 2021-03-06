import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { SpinnerService } from './widgets';
import { AppSettingsService } from './core/services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    public spinnerService: SpinnerService,
    private appSettingsService: AppSettingsService
) { }

 title = 'Made by Nadya Ponkratova';

 ngOnInit() {
  const settings = this.appSettingsService.loadFromLocalstorage();
  console.log('Настройки App из Localstorage в AppComponent: ', settings);
 }
}
