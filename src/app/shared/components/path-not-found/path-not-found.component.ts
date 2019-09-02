import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-path-not-found',
  templateUrl: './path-not-found.component.html',
  styleUrls: ['./path-not-found.component.css']
})
export class PathNotFoundComponent {

  constructor(private location: Location) {}

  backToCatalogue(): void {
    this.location.back();
  }

}
