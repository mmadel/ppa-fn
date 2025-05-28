import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DateRangePickerModule,
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
} from '@coreui/angular-pro';
import {
  DefaultLayoutComponent,
  DefaultHeaderComponent,
  DefaultFooterComponent,
} from './core';
import { HasRoleDirective } from './core/shared/directives/has-role.directive';
import { JwtHelperService, JwtInterceptor, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginComponent } from './core/shared/component/login/login.component';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
const APP_CONTAINERS = [
  DefaultHeaderComponent,
  DefaultFooterComponent,
  DefaultLayoutComponent
];
export function tokenGetter() {
  return localStorage.getItem('access_token'); // Match your token storage key
}
export function jwtOptionsFactory() {
  return {
    tokenGetter,
    allowedDomains: [new URL(environment.baseURL).hostname],
    disallowedRoutes: [
      `${environment.baseURL}auth/login`,
      `${environment.baseURL}auth/register`,
      `${environment.baseURL}auth/refresh-token`
    ]
  };
}
export function getSafeAllowedDomains(): string[] {
  try {
    if (!environment.baseURL) return [];
    const url = new URL("http://localhost:8080/" +environment.baseURL);
    return [url.hostname]; // Return just the domain without port
  } catch (e) {
    console.warn('Invalid API URL in environment:', environment.baseURL);
    return ['localhost']; // Fallback for development
  }
}
@NgModule({
  declarations: [
    AppComponent,...APP_CONTAINERS, HasRoleDirective, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    ReactiveFormsModule,
    IconModule,
    FormsModule,
    AlertModule,
    DateRangePickerModule,BrowserAnimationsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => ({
          tokenGetter: tokenGetter,
          allowedDomains: getSafeAllowedDomains(),
          disallowedRoutes: [
            `${environment.baseURL}auth/login`,
            `${environment.baseURL}auth/register`
          ]
        })
      }
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
