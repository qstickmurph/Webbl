import { TestBed } from '@angular/core/testing';

import { GameOddsService } from './game-odds.service';

describe('GameOddsService', () => {
  let service: GameOddsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOddsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
