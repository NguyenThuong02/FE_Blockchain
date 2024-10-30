import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  createObject(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/object/create`, body);
  }

  updateObject(body: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/api/object/update', body)
  }

  listObjectByUnit(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/object/get-all-object-from-unit`, body);
  }

  getMemberObject(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/object/get-all-member/${id}`);
  }
}
