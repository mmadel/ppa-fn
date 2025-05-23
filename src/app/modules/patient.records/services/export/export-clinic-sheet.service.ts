import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportClinicSheetService {
  private baseUrl = environment.baseURL + 'export'
  constructor(private httpClient: HttpClient) { }
  
  public exportClinicSheet(ids:number[]){
    const headers = { 'content-type': 'application/json' }
    const url = this.baseUrl +'/get/eligibility';
    return this.httpClient.post(url, JSON.stringify(ids) ,{ 'headers': headers, responseType: 'blob' })
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
}
