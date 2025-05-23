import { TestBed } from '@angular/core/testing';

import { UploadPatientFileService } from './upload-patient-file.service';

describe('UploadPatientFileService', () => {
  let service: UploadPatientFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPatientFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
