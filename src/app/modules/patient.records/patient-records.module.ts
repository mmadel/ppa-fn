import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRecordsRoutingModule } from './patient-records-routing.module';
import { PpaCommonModule } from '../common/ppa-common.module';
import { ImportPatientRecordComponent } from './components/import.patient.records/import-patient-record.component';
import { ShowPatientRecordsComponent } from './components/show.patient.records/show-patient-records.component';
import { CalloutModule, ModalModule, SmartPaginationModule, SmartTableModule } from '@coreui/angular-pro';
import { PatientBatchsComponent } from './components/patient.batchs/patient-batchs.component';
import { LocationEligibilityComponent } from './components/location.eligibility/location-eligibility.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ImportPatientRecordComponent,
    ShowPatientRecordsComponent,
    PatientBatchsComponent,
    LocationEligibilityComponent
  ],
  imports: [
    CommonModule,
    PpaCommonModule,
    PatientRecordsRoutingModule,
    CalloutModule,
    SmartTableModule,
    SmartPaginationModule,
    ModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class PatientRecordsModule { }
