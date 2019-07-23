import { TestBed } from '@angular/core/testing';

import { GeneratorFactoryService } from './generator-factory.service';

describe('GeneratorFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneratorFactoryService = TestBed.get(GeneratorFactoryService);
    expect(service).toBeTruthy();
  });
});
