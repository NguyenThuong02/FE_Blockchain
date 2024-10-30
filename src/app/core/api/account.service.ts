import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  createTenant(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/tenant/create', body);
  }

  getViewInfo(): Observable<any> {
    return this.http.get(this.apiUrl + `/api/user/get-user-id`);
  }

  updateInfo(body: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/api/user/update-user', body)
  }

  changePassword(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/user/change-password', body);
  }

  checkEmail(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/user/check-email', body);
  }

  checkOTP(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/user/check-otp', body);
  }
}
