import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, DateRangePickerModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, MultiSelectModule, NavModule, ProgressModule, SharedModule, SidebarModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';

const COREUI_MODULES = [
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  IconModule,
  DateRangePickerModule,
  AlertModule,
  MultiSelectModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    SharedModule,
    FormModule,
    ButtonModule,
    TableModule,
    UtilitiesModule,
    IconModule,
    ButtonGroupModule,
  ],
  exports: [
    ...COREUI_MODULES,
    ReactiveFormsModule ,FormsModule
  ],
})
export class PpaCommonModule { }
