import { TestBed } from "@angular/core/testing";
import { AvailableMovesService } from "./available-moves.service";

describe('AvailableMoveService', () => {
  let service: AvailableMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
