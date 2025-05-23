import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { NavItems } from './_nav';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  navItems: INavData[] | null | undefined;
  constructor() { }

  ngOnInit(): void {
    this.navItems = NavItems;
  }

}
