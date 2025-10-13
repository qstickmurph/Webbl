import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsPopoverComponent } from './odds-popover.component';

describe('OddsPopoverComponent', () => {
  let component: OddsPopoverComponent;
  let fixture: ComponentFixture<OddsPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OddsPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OddsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
