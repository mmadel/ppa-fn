import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { BasePaginationService } from 'src/app/modules/common/service/pagination/base-pagination.service';
import { IApiParams } from 'src/app/modules/interfaces/api.params';
import { environment } from 'src/environments/environment';
import { SearchCriteria } from '../../components/location.eligibility/location-eligibility.component';

@Injectable({
  providedIn: 'root'
})
export class BatchServiceService extends BasePaginationService {
  searchTrigger = new BehaviorSubject<string>("");
  private baseUrl = environment.baseURL + 'batches'
  constructor(httpClient: HttpClient) { super(httpClient) }

  public findAll(config$: BehaviorSubject<IApiParams>): Observable<any> {
    var url = this.baseUrl + '/get'
    return this.get(config$, url)
  }
  public export(batchKey: string, clinic: string) {
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + '/get/' + batchKey + '/clinic/' + clinic;
    return this.httpClient.get(url, { 'headers': headers, responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }
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

  public search(criteria: SearchCriteria) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
    

    if (criteria.pmrbId) {
      params = params.set('pmrbId', criteria.pmrbId);
    }
    if (criteria.location && criteria.location !== 'none') {
      params = params.set('location', criteria.location);
    }
    if (criteria.status && criteria.status !== 'none') {
      params = params.set('status', criteria.status);
    }
    if (criteria.lastUpdate && criteria.lastUpdate !== undefined) {
      params = params.set('lastUpdate', criteria.lastUpdate.toString());
    }
    var createURL = this.baseUrl + '/cer/search'
    return this.httpClient.get(`${createURL}`,{ params })
  }

  public exportClinicSheet(){
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl + '/get/eligibility';
    return this.httpClient.get(url, { 'headers': headers, responseType: 'blob' })
      .pipe(catchError(this.handleError)).subscribe(
        (response) => {
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(response)
          a.href = objectUrl
          var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
          a.download = 'Eligibility-' + nameDatePart + '.xlsx';
          a.click();
          URL.revokeObjectURL(objectUrl);
          
        },
        (error) => {
        });
  }
 
}
