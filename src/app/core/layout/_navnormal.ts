import { INavData } from '@coreui/angular-pro';

export const NavNormalItems: INavData[] = [
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
];
