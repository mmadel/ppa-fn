import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportPatientRecordComponent } from './components/import.patient.records/import-patient-record.component';
import { LocationEligibilityComponent } from './components/location.eligibility/location-eligibility.component';
import { PatientBatchsComponent } from './components/patient.batchs/patient-batchs.component';
import { ShowPatientRecordsComponent } from './components/show.patient.records/show-patient-records.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Patient Records',
  },
  children: [
    {
      path: 'import',
      component: ImportPatientRecordComponent,
      data: {
        title: 'Import files',
      },
    },
    {
      path: 'batchs',
      component: PatientBatchsComponent,
      data: {
        title: 'Patient Batchs',
      },
    },
    {
      path: 'eligibility',
      component: LocationEligibilityComponent,
      data: {
        title: 'Locations eligibility',
      },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRecordsRoutingModule { }
