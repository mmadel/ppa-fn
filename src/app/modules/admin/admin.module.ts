import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUserComponent } from './component/users/list/list-user.component';
import { BadgeModule } from '@coreui/angular-pro';


@NgModule({
  declarations: [
    ListUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BadgeModule
  ]
})
export class AdminModule { }
