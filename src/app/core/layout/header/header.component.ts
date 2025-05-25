import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar1";
  selectedValue: string | null = null;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private classToggler: ClassToggleService
    , private authService: AuthService
    , private router: Router) {
    super();
  }
  ngOnInit(): void {

  }
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase();
  }
  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  setSelectedClinic(event: any) {

  }
}
