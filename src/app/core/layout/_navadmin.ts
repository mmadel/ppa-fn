import { INavData } from '@coreui/angular-pro';

export const NavAdmin: INavData[] = [
  {
    name: 'Administration',
    url: '',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'User',
    url: '',
    iconComponent: { name: 'cil-applicationsSettings' },
    children: [
      {
        name: 'List Users',
        url: 'admin/users'
      },
    ]
  },
];
