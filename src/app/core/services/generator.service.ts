import {
  Injectable
} from '@angular/core';

import {
  CoreModule
} from './../core.module';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor() {}

  makeRandomeString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
