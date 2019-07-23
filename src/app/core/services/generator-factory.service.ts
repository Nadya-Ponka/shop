import {
  InjectionToken
} from '@angular/core';

import {
  GeneratorService
} from './generator.service';

export const DataStringRandome = new InjectionToken < any[] > ('DataStringRandome');

export function DataString(length: number) {
  return (result: GeneratorService): any =>
    result.makeRandomeString(length);
}
