import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadPatientFileService {
  private baseUrl = environment.baseURL + 'file/processing'
  constructor(private httpClient: HttpClient) { }

  upload(formData: FormData){
    let url = this.baseUrl + '/upload'
    let headers = new HttpHeaders({
      'X-Request-Tag': 'IMPORT'
    });
    return this.httpClient.post(url, formData,{ headers });
  }
}
