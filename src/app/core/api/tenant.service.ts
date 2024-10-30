import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createTenantModel, getListTenantModel } from '../model/tenant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getListTenant(): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/get-all-from-owner`);
  }

  getListTenantFromMember(): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/get-all-from-member`);
  }

  createTenant(body: createTenantModel): Observable<any> {
    return this.http.post(this.apiUrl + '/api/tenant/create', body);
  }

  getDetailTenant(idTenant: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/tenant-detail/${idTenant}`);
  }

  updateTenant(body: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/api/tenant/update', body)
  }
}
