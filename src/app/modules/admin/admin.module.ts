import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUserComponent } from './component/users/list/list-user.component';
import { BadgeModule, ButtonModule, ModalModule } from '@coreui/angular-pro';
import { CreateComponent } from './component/users/create/create.component';
import { PpaCommonModule } from '../common/ppa-common.module';


@NgModule({
  declarations: [
    ListUserComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PpaCommonModule,
    BadgeModule,
    ModalModule,
    ButtonModule
  ]
})
export class AdminModule { }
