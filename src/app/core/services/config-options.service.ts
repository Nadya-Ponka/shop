import {
  Injectable
} from '@angular/core';

/* import { CoreModule } from './../core.module';
 */
@Injectable({
  providedIn: 'root'
})

class SettingsObject {
  constructor(
    public id: number = null,
    public login: string,
    public email?: string
  ) {}
}

export class ConfigOptionsService {

  constructor() {}
  private obj: SettingsObject;

  getObject() {
    return this.obj;
  }

  setObject(obj: SettingsObject) {
    this.obj = new SettingsObject(obj.id, obj.login, obj.email);
    return this.obj;
  }
}
