import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    public spinnerService: SpinnerService
) { }

 title = 'Made by Nadya Ponkratova';

}
