import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './enviroment';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = `${environment.apiUrl}/auth/register`;
  private loginUrl = `${environment.apiUrl}/auth/jwt/login`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    return this.http.post<any>(this.loginUrl, body.toString(), { headers });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('user_id') || '0', 10);
  }
}
