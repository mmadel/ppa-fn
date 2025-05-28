import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { ListUserComponent } from './component/users/list/list-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administration',
    }, 
    children: [
      {
        path: 'import',
        canActivate: [RoleGuard],
        component: ListUserComponent,
        data: {
          title: 'users',
          roles: ['ROLE_ADMIN','ROLE_USER'] 
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
