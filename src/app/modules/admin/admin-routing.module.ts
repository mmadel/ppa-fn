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
        path: 'users',
        canActivate: [RoleGuard],
        component: ListUserComponent,
        data: {
          title: 'users',
          roles: ['ROLE_MODERATOR'] 
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
