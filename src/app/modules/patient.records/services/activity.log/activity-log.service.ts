import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { BasePaginationService } from 'src/app/modules/common/service/pagination/base-pagination.service';
import { IApiParams } from 'src/app/modules/interfaces/api.params';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService extends BasePaginationService  {
  private baseUrl = environment.baseURL + 'activity-log'
  constructor(httpClient: HttpClient) { super(httpClient) }


  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage))
  }
  public search(extraParams:Map<string, any>,config$: BehaviorSubject<IApiParams>){
    var url = this.baseUrl + '/search'
    return this.get(config$, url,extraParams)
  }
}
