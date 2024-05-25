import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../services/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getApis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/apis/`);
  }

  getApi(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/apis/${id}`);
  }

  createApi(api: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/`, api);
  }

  likeApi(apiId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/likes/`, { api_id: apiId });
  }

  commentApi(apiId: number, content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments/`, { api_id: apiId, content });
  }

  getComments(apiId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/${apiId}`);
  }
}
