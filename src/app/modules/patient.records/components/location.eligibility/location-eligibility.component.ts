import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, Observable } from 'rxjs';
import { Clinic } from '../../models/clinic';
import { ClinicEligibilityRecord } from '../../models/clinic.eligibility.record';
import { BatchServiceService } from '../../services/batch/batch-service.service';
import { ClinicService } from '../../services/clinic/clinic.service';
import { ExportClinicSheetService } from '../../services/export/export-clinic-sheet.service';
export interface SearchCriteria {
  pmrbId?: string,
  location?: string,
  status?: string
  lastUpdate?: Date | string;
}
@Component({
  selector: 'app-location-eligibility',
  templateUrl: './location-eligibility.component.html',
  styleUrls: ['./location-eligibility.component.css']
})
export class LocationEligibilityComponent implements OnInit {
refreshData() {
throw new Error('Method not implemented.');
}

  searchCriteria: SearchCriteria = { location: 'none', status: 'none' }
  statuses: string[] = ['Pending', 'Ready', 'Failed']
  locations!: Observable<Clinic[]>
  pmrbId!: string;
  clinicEligibilityRecord: ClinicEligibilityRecord[] = [];
  allSelected = false;
  constructor(private clinicService: ClinicService,
    private batchServiceService: BatchServiceService,
    private route: ActivatedRoute,
    private exportClinicSheetService: ExportClinicSheetService,
    private spinner: NgxSpinnerService) { }

  get isSearchDisabled(): boolean {
    const { pmrbId, location, status, lastUpdate } = this.searchCriteria;
    return (!pmrbId?.trim()) &&
      (location === 'none') &&
      (status === 'none') &&
      (lastUpdate === undefined || lastUpdate === '')
  }
  updateAllStatuses(): void {
    this.clinicEligibilityRecord = this.clinicEligibilityRecord.map(record => ({
      ...record,
      status: 'Ready'
    }));
  }
  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter((params: any) => params.prmbId !== undefined)
    )
      .subscribe((params: any) => {
        this.requestFromUploadComponent(params.prmbId);
      });
    this.findClinics();

  }
  private findClinics() {
    this.locations = this.clinicService.find();
  }
  search() {
    this.spinner.show()
    this.batchServiceService.search(this.searchCriteria!).subscribe((data: any) => {
      this.spinner.hide()
      this.clinicEligibilityRecord = data.map((item: any) => ({ ...item, selected: false }));
    })
  }
  requestFromUploadComponent(pmrbId: string) {
    this.searchCriteria.pmrbId = pmrbId;
    this.spinner.show()
    this.batchServiceService.search(this.searchCriteria!).subscribe((data: any) => {
      this.spinner.hide()
      this.clinicEligibilityRecord = data.map((item: any) => ({ ...item, selected: false }));
    })
  }
  toggleAllSelection(): void {
    this.clinicEligibilityRecord.forEach(loc => loc.selected = this.allSelected);
  }
  updateMasterCheckbox(): void {
    this.allSelected = this.clinicEligibilityRecord.every(loc => loc.selected);
  }
  exportSelected() {
    var selectedRecordIds: number[] = [];
    for (var i = 0; i < this.clinicEligibilityRecord.length; i++) {
      if (this.clinicEligibilityRecord[i].selected && this.clinicEligibilityRecord[i].status === 'Ready')
        selectedRecordIds.push(this.clinicEligibilityRecord[i].id)
    }
    this.spinner.show();
    this.exportClinicSheetService.exportClinicSheet(selectedRecordIds).subscribe(
      (response) => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(response)
        a.href = objectUrl
        var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        a.download = 'Eligibility-' + nameDatePart + '.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.spinner.hide();
      },
      (error) => {
      });
  }
  updateStatus(clinicName: string): void {
    this.clinicEligibilityRecord = this.clinicEligibilityRecord.map(record =>

      {
        console.log('record.clinicName ' + record.clinicName)  
        console.log('pushed clinic ' + clinicName)
        return record.clinicName === clinicName ? { ...record, status: "Ready" } : record
      }
    );
  }
}
