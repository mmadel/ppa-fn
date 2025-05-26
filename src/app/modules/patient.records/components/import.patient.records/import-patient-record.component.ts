import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BatchServiceService } from '../../services/batch/batch-service.service';
import { UploadPatientFileService } from '../../services/upload.files/upload-patient-file.service';

@Component({
  selector: 'app-import-patient-record',
  templateUrl: './import-patient-record.component.html',
  styleUrls: ['./import-patient-record.component.css']
})
export class ImportPatientRecordComponent implements OnInit {
  pageTitle: string = 'Import ';
  submitting = false;
  uploadForm!: FormGroup;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  selectedFiles: { [key: string]: File | null } = {
    benefitFile: null,
    documentFile: null,
    paymentFile: null
  };
  dragging = {
    benefitFile: false,
    documentFile: false,
    paymentFile: false
  };
  constructor(private fb: FormBuilder,
    private uploadPatientFileService: UploadPatientFileService,
    private router: Router,
    private batchServiceService: BatchServiceService
  ) {
    this.uploadForm = this.fb.group({
      benefitFile: [null, Validators.required],
      documentFile: [null, Validators.required],
      paymentFile: [null, Validators.required]
    });
  }
  onFileSelected(event: Event, fileType: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.name.endsWith('.csv')) {
      this.selectedFiles[fileType] = file;
      this.uploadForm.patchValue({ [fileType]: file });
      this.uploadForm.get(fileType)?.setValue(file); // ✅ Important
      this.uploadForm.get(fileType)?.markAsTouched(); // Optional: mark for UI validation
      this.uploadForm.get(fileType)?.updateValueAndValidity(); // ✅ Ensures form validity
    } else {
      alert('Please upload a valid CSV file.');
    }
  }
  private clearForm() {
    this.uploadForm.reset();
    this.selectedFiles = {
      benefitFile: null,
      documentFile: null,
      paymentFile: null
    };
  }
  onSubmit() {

    if (this.uploadForm.valid && !this.submitting) {
      this.submitting = true;
      const formData = new FormData();
      Object.keys(this.selectedFiles).forEach(key => {
        if (this.selectedFiles[key]) {
          formData.append(key, this.selectedFiles[key] as Blob);
        }
      });

      this.uploadPatientFileService.upload(formData).subscribe({
        next: (response: any) => {
          this.message = 'Files uploaded successfully!';
          this.messageType = 'success';
          this.submitting = false;
          console.log(JSON.stringify(response.pmrbId))
          this.redirectToLocationEligibility(response.pmrbId);
          this.clearForm();
        },
        error: err => {
          this.message = 'Upload failed: ' + err.message;
          this.messageType = 'error';
          this.submitting = false;
        }
      });
    }
  }
  ngOnInit(): void {
  }
  onDragOver(event: DragEvent, key: keyof typeof this.dragging) {
    event.preventDefault();
    this.dragging[key] = true;
  }

  onDragLeave(event: DragEvent, key: keyof typeof this.dragging) {
    event.preventDefault();
    this.dragging[key] = false;
  }

  onFileDrop(event: DragEvent, key: keyof typeof this.dragging) {
    event.preventDefault();
    this.dragging[key] = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFiles[key] = files[0];
      this.uploadForm.get(key)?.setValue(files[0]);
      this.uploadForm.get(key)?.setValue(files[0]); // ✅ Important
      this.uploadForm.get(key)?.markAsTouched();    // Optional
      this.uploadForm.get(key)?.updateValueAndValidity(); // ✅ Ensures validity
    }
  }
  private redirectToLocationEligibility(pmrbId:string) {
    this.router.navigate(['ppa/patient/record/eligibility'], {
      queryParams: { 
        prmbId: pmrbId
      }
    });
  }
}
