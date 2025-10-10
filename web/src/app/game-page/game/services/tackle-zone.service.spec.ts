import { TestBed } from '@angular/core/testing';

import { TackleZoneService } from './tackle-zone.service';

describe('TackleZoneService', () => {
  let service: TackleZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TackleZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
