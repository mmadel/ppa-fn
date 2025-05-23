import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './core';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './core/shared/component/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ppa/dashboard',
    pathMatch: 'full',
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'ppa',
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] },
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
