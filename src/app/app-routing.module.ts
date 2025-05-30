import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './core';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './core/shared/component/login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'ppa',
    component: DefaultLayoutComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'patient/record',
        loadChildren: () =>
          import('./modules/patient.records/patient-records.module').then((m) => m.PatientRecordsModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule)
      },
    ]
  },
  // Wildcard route should also be protected
  { 
    path: '**', 
    canActivate: [AuthGuard],
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
