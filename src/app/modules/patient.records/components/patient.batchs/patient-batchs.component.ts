import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, Observable, tap } from 'rxjs';
import { ListTemplate } from 'src/app/modules/common/template/list.template';
import { PatientRecordImportJob } from '../../models/patient.record.import.job';
import { User } from '../../models/user';
import { ActivityLogService } from '../../services/activity.log/activity-log.service';
import { UserService } from '../../services/users/user.service';
export interface PMRSearchCriteria {
  pmrbId?: string,
  status?: string
  userName?: string
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
  searchCriteria: PMRSearchCriteria = { status: 'none', userName: 'none' }
  batchErrorMessage:string| undefined = undefined;
  columns = [
    {
      key: 'requestId',
      label: 'Batch Number',
      _style: { width: '10%' }
    },
    { key: 'createdAt', label: 'Created At', _style: { width: '10%' } },
    { key: 'username', label: 'Created By', _style: { width: '10%' } },
    { key: 'status', label: 'Status', _style: { width: '10%' } },
    { key: 'view', label: 'View', _style: { width: '10%' } },
  ];
  errorMsg!: string;
  failedReasonsVisibility: boolean = false;
  constructor(private userService: UserService
    , private activityLogService: ActivityLogService
    ,private spinner: NgxSpinnerService) { super(); }

  ngOnInit(): void {
    this.initListComponent();
    this.findUsers();
  }
  openFailedReasons(item:string){
    this.batchErrorMessage =`<p><strong>Error Cause </strong> <br/>, ${item}.</p>`; 

    this.failedReasonsVisibility = true;
  }
  toggleFailedReasons(){
    this.failedReasonsVisibility = !this.failedReasonsVisibility
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
    this.spinner.show();
    this.importJbos$ = this.activityLogService.search(this.toMap(this.searchCriteria), this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        this.spinner.hide();
        return response.records;
      })
    )
  }
  get isSearchDisabled(): boolean {
    const { pmrbId, status, createdAt, userName } = this.searchCriteria;
    return (!pmrbId?.trim()) &&
      (status === 'none') &&
      (userName === 'none') &&
      (createdAt === undefined || createdAt === '')
  }
  toMap(criteria: PMRSearchCriteria): Map<string, any> {
    const map = new Map<string, any>();
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'none')
        map.set(key, value);
    });
    return map;
  }
}
