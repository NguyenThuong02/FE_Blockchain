import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyResultService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  createKeyResult(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/keyresult/create`, body);
  }

  updateKeyResult(body: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/api/keyresult/update', body)
  }

  listKeyResultByObject(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/keyresult/get-all-KeyResult-from-object`, body);
  }

  getMemberKeyResult(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/keyresult/get-member-from-key-result/${id}`);
  }
}
