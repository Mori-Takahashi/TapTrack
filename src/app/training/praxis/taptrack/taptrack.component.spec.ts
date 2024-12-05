import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaptrackComponent } from './taptrack.component';

describe('TaptrackComponent', () => {
  let component: TaptrackComponent;
  let fixture: ComponentFixture<TaptrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaptrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaptrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
