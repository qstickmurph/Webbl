import { TestBed } from '@angular/core/testing';

import { MovePathService } from './move-path.service';

describe('MovePath', () => {
  let service: MovePathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovePathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
