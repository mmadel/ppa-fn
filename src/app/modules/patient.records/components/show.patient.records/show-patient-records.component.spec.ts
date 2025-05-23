import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPatientRecordsComponent } from './show-patient-records.component';

describe('ShowPatientRecordsComponent', () => {
  let component: ShowPatientRecordsComponent;
  let fixture: ComponentFixture<ShowPatientRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPatientRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPatientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
