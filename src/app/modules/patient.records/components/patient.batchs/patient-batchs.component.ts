import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import { ListTemplate } from 'src/app/modules/common/template/list.template';
import { PatientRecordImportJob } from '../../models/patient.record.import.job';
import { User } from '../../models/user';
import { BatchServiceService } from '../../services/batch/batch-service.service';
import { ClinicService } from '../../services/clinic/clinic.service';
import { UserService } from '../../services/users/user.service';
export interface PMRSearchCriteria {
  pmrbId?: string,
  status?: string
  createdAt?: Date | string;
}

@Component({
  selector: 'app-patient-batchs',
  templateUrl: './patient-batchs.component.html',
  styleUrls: ['./patient-batchs.component.css']
})
export class PatientBatchsComponent extends ListTemplate implements OnInit {
  statuses: string[] = ['Pending', 'Ready', 'Failed']
  importJbos$!: Observable<PatientRecordImportJob[]>;
  users!: Observable<User[]>
  searchCriteria: PMRSearchCriteria = { status: 'none' }
  columns = [
    {
      key: 'pmrbId',
      label: 'Batch Number',
      _style: { width: '10%' }
    },
    { key: 'createdAt', label: 'Created At', _style: { width: '10%' } },
    { key: 'completedAt', label: 'Completed At', _style: { width: '10%' } },
    { key: 'status', label: 'Status', _style: { width: '10%' } },
  ];
  errorMsg!: string;
  constructor(private batchServiceService: BatchServiceService
    , private userService: UserService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    // this.find();
  }
  private find() {
    this.importJbos$ = this.batchServiceService.findAll(this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    )
  }
  getBadge(status: string) {
    switch (status) {
      case 'Pending':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Failed':
        return 'danger'
      default:
        return 'primary'
    }
  }
  private findUsers() {
    this.users = this.userService.findAll();
  }
  search() {
    this.importJbos$ = this.batchServiceService.searchPMR(this.toMap(this.searchCriteria), this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    )
  }
  get isSearchDisabled(): boolean {
    const { pmrbId, status, createdAt } = this.searchCriteria;
    return (!pmrbId?.trim()) &&
      (status === 'none') &&
      (createdAt === undefined || createdAt === '')
  }
  toMap(criteria: PMRSearchCriteria): Map<string, any> {
    const map = new Map<string, any>();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '')
        map.set(key, value);
    });
    return map;
  }
}
