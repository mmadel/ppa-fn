import { INavData } from '@coreui/angular-pro';

export const NavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Patient Records',
    url: '',
    iconComponent: { name: 'cil-applicationsSettings' },
    children: [
      {
        name: 'Import Patient Records',
        url: 'patient/record/import'
      },
      {
        name: 'Location Eligibility',
        url: 'patient/record/eligibility'
      }
    ]
  },
  {
    name: 'Activity logs',
    iconComponent: { name: 'cilBookmark' },
    children: [
      {
        name: 'Patient Batchs',
        url: 'patient/record/batchs'
      },
    ]
  }
];
