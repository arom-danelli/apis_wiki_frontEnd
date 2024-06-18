import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../models/api';
import { environment } from './enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getApis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/apis/`);
  }

  getApi(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/apis/${id}`);
  }

  createApi(api: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/apis/`, api);
  }

  likeApi(apiId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/apis/${apiId}/likes/`, {}, { headers });
  }

  commentApi(apiId: number, content: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/comments/`, { api_id: apiId, content }, { headers });
  }

  getComments(apiId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/${apiId}`);
  }

  deleteApi(apiId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/apis/${apiId}`, { headers });
  }
}
