import { TestBed } from '@angular/core/testing';

import { RecepientserviceService } from './recepientservice.service';

describe('RecepientserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecepientserviceService = TestBed.get(RecepientserviceService);
    expect(service).toBeTruthy();
  });
});
