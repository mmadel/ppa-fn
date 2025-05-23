import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../models/clinic';


@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private baseUrl = environment.baseURL + 'clinic'
  constructor(private httpClient: HttpClient) {  }
  find() {
    const url = this.baseUrl +'/find'
    return this.httpClient.get(url).pipe(
      map((response: any) => <Clinic[]>response));
  }

}
