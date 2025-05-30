import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, switchMap, catchError, retry, throwError } from 'rxjs';
import { IApiParams } from 'src/app/modules/interfaces/api.params';
import { PaginationData } from 'src/app/modules/interfaces/pagination.data';


const httpOptions = {};
@Injectable({
  providedIn: 'root'
})
export class BasePaginationService {
  constructor(public httpClient: HttpClient) { }
  get(config$: BehaviorSubject<IApiParams>, url: string, params?: Map<string, string>): Observable<any> {
    return config$.pipe(
      debounceTime(100),
      distinctUntilChanged(
        (previous, current) => {
          return JSON.stringify(previous) === JSON.stringify(current);
        }
      ),
      switchMap((config) => this.fetchData(config, url, params))
    );
  }
  private fetchData(
    params: IApiParams,
    url: string,
    extraParams?: Map<string, string>
  ): Observable<PaginationData> {
    const apiParams = {
      ...params,
    };
  
    let httpParams: HttpParams = new HttpParams({ fromObject: apiParams });
  
    if (extraParams !== undefined) {
      extraParams.forEach((value: string, key: string) => {
        httpParams = httpParams.append(key, value); // ✅ REASSIGN
      });
    }
  
    const options = {
      params: httpParams,
      ...httpOptions,
    };
  
    return this.httpClient
      .get<PaginationData>(url, options)
      .pipe(
        retry({ count: 1, delay: 100000, resetOnSuccess: true }),
        catchError(this.handleHttpError)
      );
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
