import { InjectionToken } from '@angular/core';

const appSettingsUrl = './../../../assets/app-settings.json';
export const appSettingsAPI = new InjectionToken<string>('appSettingsAPI');

export const appSettingsAPIProvider = {
    provide: appSettingsAPI,
    useValue: appSettingsUrl
};
