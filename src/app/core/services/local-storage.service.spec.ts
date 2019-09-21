import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService without the TestBed', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
  });

  it('LocalStorageService.getItem should return real value', () => {
    expect(service.getItemFromLocalstorage('AppSettings')).toEqual(JSON.parse(localStorage.getItem('AppSettings')));
  });
});
