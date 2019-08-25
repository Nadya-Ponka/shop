import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-path-not-found',
  templateUrl: './path-not-found.component.html',
  styleUrls: ['./path-not-found.component.css']
})
export class PathNotFoundComponent {

  constructor(private location: Location) {}

  backCatalogue(): void {
    this.location.back();
  }

}
