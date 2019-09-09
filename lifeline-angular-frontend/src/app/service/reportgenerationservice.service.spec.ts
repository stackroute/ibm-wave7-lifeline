import { TestBed } from '@angular/core/testing';

import { ReportgenerationserviceService } from './reportgenerationservice.service';

describe('ReportgenerationserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportgenerationserviceService = TestBed.get(ReportgenerationserviceService);
    expect(service).toBeTruthy();
  });
});
