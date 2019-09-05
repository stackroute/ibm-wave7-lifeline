import { TestBed } from '@angular/core/testing';

import { DonorProfileService } from './donor-profile.service';

describe('DonorProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonorProfileService = TestBed.get(DonorProfileService);
    expect(service).toBeTruthy();
  });
});
