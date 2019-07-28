import { TestBed } from '@angular/core/testing';

import { LunchserviceService } from './lunchservice.service';

describe('LunchserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LunchserviceService = TestBed.get(LunchserviceService);
    expect(service).toBeTruthy();
  });
});
