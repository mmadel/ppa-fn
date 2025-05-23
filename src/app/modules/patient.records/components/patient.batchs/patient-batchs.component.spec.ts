import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBatchsComponent } from './patient-batchs.component';

describe('PatientBatchsComponent', () => {
  let component: PatientBatchsComponent;
  let fixture: ComponentFixture<PatientBatchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBatchsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientBatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
