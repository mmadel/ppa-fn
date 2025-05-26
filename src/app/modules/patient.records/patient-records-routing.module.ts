import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { ImportPatientRecordComponent } from './components/import.patient.records/import-patient-record.component';
import { LocationEligibilityComponent } from './components/location.eligibility/location-eligibility.component';
import { PatientBatchsComponent } from './components/patient.batchs/patient-batchs.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Patient Records',
  },
  children: [
    {
      path: 'import',
      canActivate: [RoleGuard],
      component: ImportPatientRecordComponent,
      data: {
        title: 'Import files',
        roles: ['ROLE_ADMIN','ROLE_USER'] 
      },
    },
    {
      path: 'batchs',
      canActivate: [RoleGuard],
      component: PatientBatchsComponent,
      data: {
        title: 'Patient Batchs',
        roles: ['ROLE_ADMIN'] 
      },
    },
    {
      path: 'eligibility',
      canActivate: [RoleGuard],
      component: LocationEligibilityComponent,
      data: {
        title: 'Locations eligibility',
        roles: ['ROLE_ADMIN','ROLE_USER'] 
      },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRecordsRoutingModule { }
