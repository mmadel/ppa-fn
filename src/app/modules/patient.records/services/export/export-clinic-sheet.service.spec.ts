import { TestBed } from '@angular/core/testing';

import { ExportClinicSheetService } from './export-clinic-sheet.service';

describe('ExportClinicSheetService', () => {
  let service: ExportClinicSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportClinicSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
