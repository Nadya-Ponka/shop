import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {

  constructor() {}

  getConstant() {
    return [{
        HomeWork: 'Task-1',
        Ver: '1.0'
      },
      {
        HomeWork: 'Task-2',
        Ver: '2.0'
      },
      {
        HomeWork: 'Task-3',
        Ver: '3.0'
      },
    ];
  }
}

export const constantFromService = new ConstantService();
