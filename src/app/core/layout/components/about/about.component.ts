import { Component,
  OnInit,
  Optional,
  Inject
} from '@angular/core';

import { LocalStorageService } from './../../../services/local-storage.service';
import { ConfigOptionsService } from './../../../services/config-options.service';
import { ConstantService, constantFromService } from './../../../services/constant.service';
import { GeneratorService } from './../../../services/generator.service';
import { DataString, DataStringRandome } from './../../../services/generator-factory.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [
    ConfigOptionsService,
    {
      provide: LocalStorageService,
      useClass: LocalStorageService
    },
    {
      provide: ConstantService,
      useValue: constantFromService
    },
    GeneratorService, {
      provide: DataStringRandome,
      useFactory: DataString(8),
      deps: [GeneratorService]
    },
  ]
})

export class AboutComponent implements OnInit {

  constructor(
  @Optional() private localStorageService: LocalStorageService,
  @Optional() private configOptionsService: ConfigOptionsService,
  @Optional() private constFromService: ConstantService,
  @Inject( DataStringRandome ) private dataStringRandome: string
 ) {}

  randomeString: string;
  userObject = {
    id: 5,
    login: 'AAAA',
    email: 'nadzeya_ponkratova@epam.com'
  };

  ngOnInit() {
    this.localStorageService.setItem('LocalstorageService', this.userObject);
    this.localStorageService.getItem('LocalStorageService');
    this.localStorageService.removeItem('LocalStorageService');
    console.log('ConstantService returns constant: ', this.constFromService.getConstant());
    this.randomeString = this.dataStringRandome;
    console.log('GeneratorService returns constant using useFactory: ', this.randomeString);
    console.log('configOptionsService set object: ', this.configOptionsService.setObject(this.userObject));
    console.log('configOptionsService get object: ', this.configOptionsService.getObject());
    console.log('configOptionsService set object with unnesessary parameter: ', this.configOptionsService.setObject({
      id: 3,
      login: 'BBB'
    }));
    console.log('configOptionsService get object: ', this.configOptionsService.getObject());

  }

}
