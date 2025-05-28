import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseURL + 'user'
  constructor(private httpClient:HttpClient) { }

  find() {
    const url = this.baseUrl +'/list'
    return this.httpClient.get(url).pipe(
      map((response: any) => <User[]>response));
  }
}
