import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPatientRecordComponent } from './import-patient-record.component';

describe('ImportPatientRecordComponent', () => {
  let component: ImportPatientRecordComponent;
  let fixture: ComponentFixture<ImportPatientRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportPatientRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportPatientRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
