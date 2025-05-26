import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { BasePaginationService } from 'src/app/modules/common/service/pagination/base-pagination.service';
import { environment } from 'src/environments/environment';
import { SearchCriteria } from '../../components/location.eligibility/location-eligibility.component';

@Injectable({
  providedIn: 'root'
})
export class BatchServiceService extends BasePaginationService {
  private baseUrl = environment.baseURL + 'cer'
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

  public search(criteria: SearchCriteria) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
    if (criteria.pmrbId && criteria.pmrbId !=='') {
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
    var createURL = this.baseUrl + '/search'
    return this.httpClient.get(`${createURL}`,{ params })
  } 
  
}
