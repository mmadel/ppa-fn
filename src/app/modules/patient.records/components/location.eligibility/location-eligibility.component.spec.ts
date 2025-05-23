import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEligibilityComponent } from './location-eligibility.component';

describe('LocationEligibilityComponent', () => {
  let component: LocationEligibilityComponent;
  let fixture: ComponentFixture<LocationEligibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationEligibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
