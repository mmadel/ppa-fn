import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { AuthService } from '../services/auth.service';
import { NavItems } from './_nav';
import { NavAdmin } from './_navadmin';
import { NavNormalItems } from './_navnormal';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  navItems: INavData[] | null | undefined;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // if (this.authService.hasRole('ROLE_ADMIN')){
    //   this.navItems = NavItems;
    //   return;
    // }
    if (this.authService.hasRole('ROLE_USER')){
      this.navItems = NavNormalItems;
      return
    }
    if (this.authService.hasRole('ROLE_MODERATOR')){
      this.navItems = NavAdmin;
      return
    }
      
  }

}
