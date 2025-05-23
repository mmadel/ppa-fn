import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login.response';
import { RegisterRequest } from '../models/register.request';
import { User } from '../models/user';

type NewType = User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<NewType| null>;
  private jwtHelper = new JwtHelperService();
  private baseUrl = environment.baseURL + 'auth'
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.baseURL}auth/login`,
      { username, password },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(response => {
        // Store the received token
        localStorage.setItem('access_token', response.accessToken);
        
        // Store user details (without trying to decode yet)
        const user = {
          username: response.username,
          roles: response.roles,
          accessToken: response.accessToken
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }
  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.baseURL}/auth/register`, userData);
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  isAuthenticated(): boolean {
    const token = this.currentUserValue?.accessToken;
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.roles.includes(role) : false;
  }
  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.some(role => user.roles.includes(role)) : false;
  }
  private getUserIdFromToken(token: string): number {
    const decoded = this.jwtHelper.decodeToken(token);
    return decoded.userId || decoded.sub || 0;
  }
  getUserDetails(): Observable<User> {
    return this.http.get<User>(`${environment.baseURL}/users/me`)
      .pipe(
        tap(user => {
          const currentUser = this.currentUserValue;
          if (currentUser) {
            const updatedUser = { ...currentUser, ...user };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
          }
        })
      );
  }
}
