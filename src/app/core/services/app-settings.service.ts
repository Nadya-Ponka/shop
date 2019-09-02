import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Item } from './../../shared/models/item';
import { AppSettingsObject } from './../../shared/models/appSetting';
import { appSettingsAPI } from './app-settings.config';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AppSettingsService {

  private defaultAppSettings = {
    id: 'Default-Shop',
    title: 'Hello, World!',
    name: 'Default-Shop'
  };
  
  private appSettings: AppSettingsObject;
  private sub: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    @Inject(appSettingsAPI) private appSettingsUrl: string
  ) {}

  loadFromLocalstorage() {
    this.appSettings = this.localStorageService.getItem('AppSettings');

    if (!this.appSettings) {
      this.sub = this.getSettings()
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
        .subscribe(
          settings => {
            this.appSettings = {
              ...settings
            };
            console.log('AppSettings from file: ', this.appSettings);
            if (this.appSettings) {
              this.localStorageService.setItem('AppSettings', this.appSettings);
            }
          },
          catchError(this.handleError)
        );
    } else {
      this.appSettings = {
        ...this.defaultAppSettings
      };
      console.log('AppSettings from DefaultAppSettings: ', this.appSettings);
    }
    return this.appSettings;
  }

  getSettings(): Observable < any > {
    return this.http.get < Item[] > (this.appSettingsUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}
